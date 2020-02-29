<?php

namespace JackBradford\Plantlogg;
use JackBradford\Disphatch\Controllers\Controller;
use JackBradford\Disphatch\Controllers\IRequestController;
use JackBradford\Disphatch\Controllers\ControllerResponse;
use JackBradford\Disphatch\Etc\Activation;

class PublicController extends Controller implements IRequestController {

    public function home() {

        echo "Home";
    }

    public function activateUser() {

        $data = json_decode($this->fromPOST('data'));
        $userId = $data->userId;
        $code = $data->activationCode;

        try {

            $user = $this->userMgr->getUserById($userId);
            $user->completeActivation($code);
            $success = true;
            $message = 'User account activated.';
        }
        catch (\Exception $e) {

            $success = false;
            $message = $e->getMessage();
        }

        $returnData = (object) [
            "success" => $success,
            "userId" => $userId,
            "activationCode" => $code,
            "message" => $message,
        ];
        return new ControllerResponse($success, $message, $returnData);
    }

    public function auth() {

        $user = null;
        $data = $this->validateAuthData(json_decode($this->fromPOST('data')));
        $cred = [

            'un' => $data->un,
            'pw' => $data->pw,
        ];
        try {

            $this->userMgr->login($cred);
            $user = $this->userMgr->getCurrentUser();
            if (!empty($user)) $user = $user->getDetails();
            $username = $this->getUsername($user->id);
            $success = true;
            $message = '';// "Hi, $username!";
        }
        catch (\Exception $e) {

            $success = false;
            $message = $e->getMessage();
        }
        return new ControllerResponse($success, $message, (object)[
            'email' => (empty($user)) ? null : $user->email,
            'firstName' => (empty($user)) ? null : $user->firstName,
            'lastName' => (empty($user)) ? null : $user->lastName,
            'message' => $message,
            'userId' => (empty($user)) ? null : $user->id,
            'username' => (empty($user)) ? null : $username,
        ]);
    }

    public function checkUserIsLoggedIn() {

        $success = true;
        $user = $this->userMgr->getCurrentUser();
        if ($this->userMgr->isLoggedIn()) {

            $user = $this->userMgr->getCurrentUser()->getDetails();
            if ($user === null) {

                throw new \Exception('Could not get logged in user.');
            }
            $username = $this->getUsername($user->id);
            $message = "Hi, $username!";
        }
        else {

            $user = null;
            $message = "Not logged in.";
        }

        return new ControllerResponse($success, $message, (object) [
            "email" => (empty($user)) ? null : $user->email,
            "isLoggedIn" => (empty($user)) ? false : true,
            "firstName" => (empty($user)) ? null : $user->firstName,
            "lastName" => (empty($user)) ? null : $user->lastName,
            "message" => $message,
            "success" => $success,
            "userId" => (empty($user)) ? null : $user->id,
            "username" => (empty($user)) ? null : $username,
        ]);
    }

    public function generateNewActivationLink() {

        $data = json_decode($this->fromPOST('data'));
        $userId = $data->userId;

        try {

            $user = $this->userMgr->getUserById($userId);
            $email = $user->getDetails()->email;
            $activation = $user->getNewActivation();
            $this->sendActivationEmail($activation, $email, $this->getUsername($userId));
            $success = true;
            $code = $activation->getDetails()->code;
            $message = 'A new activation email has been sent.';
        }
        catch (\Exception $e) {

            $success = false;
            $code = null;
            $message = $e->getMessage();
        }
        $returnData = (object) [
            "success" => $success,
            "userId" => $userId,
            "code" => $code,
            "message" => $message,
        ];
        return new ControllerResponse($success, $message, $returnData);
    }

    public function getPlants() {

        $user = $this->userMgr->getCurrentUser();
        if (empty($user)) {

            $success = false;
            $message = "No user logged in.";
        }
        else {

            $success = true;
            $messgae = "Loaded plants.";
        }
        return new ControllerResponse($success, $message, (object)[
            "individuals" => [],
            "varieties" => ['aye', 'bee', 'see', 'dee'],
        ]);
    }

    /**
     * @method PublicController::registerUser()
     * Register a new site user.
     *
     * @param string $_POST['data']
     * A JSON-encoded data object containing these properties:
     * `emailAddress`
     * `username`
     * `firstName`
     * `lastName`
     * `password`
     *
     * @return ControllerResponse
     */
    public function registerUser() {

        $data = json_decode($this->fromPOST('data'));
        $email = $data->emailAddress;
        $username = $this->validateUsername($data->username);
        $firstName = (empty($data->firstName)) ? null : $data->firstName;
        $lastName = (empty($data->lastName)) ? null : $data->lastName;

        try {

            $user = $this->addUserRecord($data); // Creates a Sentinel user but returns a Disphatch User.
            $activation = $user->getActivation();
            $code = $activation->getDetails()->code;
            $recipName = (!empty($firstName) && !empty($lastName))
                ? $firstName . ' ' . $lastName
                : $username;

            $this->sendActivationEmail($activation, $email, $recipName);

            $success = true;
            $data = (object)[
                'user' => $user->getDetails(),
                'username' => $username,
                'activation_code' => $code,
                'success' => true,
            ];
            $cliMsg = 'User added successfully. Activation code: '
                . $data->activation_code;
        }
        catch (\Exception $e) {

            $success = false;
            $cliMessage = $e->getMessage();
            $data = (object) [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
        return new ControllerResponse($success, $cliMsg, $data);
    }

    /**
     * @method PublicController::validateField()
     * Validate a form field entry.
     *
     * @param string $_POST['data']
     * A JSON-encoded object containing the following properties:
     * `fieldType` The field to validate. Supported fields are found under
     *      the variable `$validators`.
     * `userInput` The user's input.
     *
     * @return ControllerResponse
     */
    public function validateField() {

        $validators = [
            'emailAddress' => 'checkEmailAddress',
            'username' => 'checkUsername',
        ];

        $data = json_decode($this->fromPOST('data'));
        $validator = $validators[$data->fieldType];
        $result = $this->{ $validator }($data->userInput);
        return new ControllerResponse(
            $result->success,
            $result->message,
            $result
        );
    }

    private function addUserRecord($userInfo) {

        $username = $this->validateUsername($userInfo->username);
        $fn = (empty($userInfo->firstName)) ? null : $userInfo->firstName;
        $ln = (empty($userInfo->lastName)) ? null : $userInfo->lastName;
        $user = $this->userMgr->createUser(
            $fn,
            $ln,
            $userInfo->emailAddress,
            $userInfo->password
        );
        if (!$this->db->getConnection('default')->insert(
            'INSERT INTO usernames (username, user_id) VALUES (?, ?)',
            [$username, $user->getDetails()->id]
        )) {
            $this->userMgr->deleteUser($user->getDetails()->id);
            throw new \Exception('Could not add username.');
        }
        return $user;
    }

    private function sendActivationEmail(Activation $activation, $email, $name) {

        $dev = ($this->config->getDirective('dev') === 1) ? true : false;
        $userId = $activation->getDetails()->userId;
        $code = $activation->getDetails()->code;
        $link = "https://plantlo.gg/activate/" . $userId . '/' . $code;

        $subject = 'Activate your PlantLogg account!';
        $body = '<p>Thank you for joining PlantLogg!</p>';
        $body .= "<p><a href=\"$link\">Click here to activate your account.</a></p>";

        $emailConf = $this->config->getDirective('email');
        $recipient = (object) ['address' => $email, 'name' => $name];

        if ($dev === false) $activation->sendActivationEmail(
            $subject,
            $body,
            (object)[
                'host' => $emailConf->host,
                'username' => $emailConf->username,
                'password' => $emailConf->password,
                'fromAddress' => $emailConf->fromAddress,
                'fromName' => $emailConf->fromName,
                'recipients' => [$recipient]
            ]
        );
        else error_log('Send activation email here.');
    }

    private function checkEmailAddress(string $address) {

        $success = false;
        $message = "Email is already registered.";

        try {
            
            $this->userMgr->getUser($address);
        }
        catch (\Exception $e) {

            $success = true;
            $message = "";
            if (!preg_match('/.+@{1,}.+/', $address)) {

                $success = false;
                $message = "Invalid email.";
            }
        }
        return (object) [
            'success' => $success,
            'message' => $message,
            'fieldType' => 'emailAddress'
        ];
    }

    private function checkUsername(string $username) {

        $success = true;
        $message = "Username is available.";
        try {

            $username = $this->validateUsername($username);
        }
        catch (\Exception $e) {

            error_log($e->getMessage());
            $success = false;
            $message = $e->getMessage();
        }
        return (object) [
            'success' => $success,
            'message' => $message,
            'fieldType' => 'username'
        ];
    }

    private function getUsername($userId) {

        $results = $this->db->getConnection('default')->select(
            'SELECT username FROM  usernames WHERE user_id=?',
            [$userId]
        ); 
        if (empty($results)) throw new \Exception('No username found.');
        return $results[0]->username;
    }

    private function validateAuthData($data) {

        if ($data === null) {

            throw new \Exception("Data from client not found or invalid.");
        }
        if (!is_object($data)) {

            throw new \Exception("Data from client must be an object.");
        }
        return $data;
    }

    private function validateUsername(string $username) {

        $username = mb_strtolower($username);
        if (!preg_match('/.+/', $username)) {

            throw new \Exception('Username cannot be empty.');
        }
        if (preg_match('/(\W)/', $username)) {

            throw new \Exception('Username may only contain letters and numbers.');
        }
        if (mb_strlen($username) > 36) {

            throw new \Exception('Username may not exceed 36 characters.');
        }
        try {
                $results = $this->db->getConnection('default')->select(
                'select * from usernames where username = ?',
                [$username]
            );
        }
        catch (\Exception $e) {

            error_log($e->getMessage());
            throw new \Exception("Internal server error.");
        }
        if ($results) {
            throw new \Exception('Username is taken.');
        }
        return $username;
    }
}

