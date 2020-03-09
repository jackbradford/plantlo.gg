<?php

namespace JackBradford\Plantlogg;
use JackBradford\Disphatch\Controllers\Controller;
use JackBradford\Disphatch\Controllers\IRequestController;
use JackBradford\Disphatch\Controllers\ControllerResponse;
use JackBradford\Disphatch\Etc\Activation;

class PublicController extends Controller implements IRequestController {

    /**
     * @method PublicController::home()
     * TODO; Fetch data required by the homepage.
     *
     * @return ControllerResponse
     */
    public function home() {

        $success = true;
        $message = '';
        $returnData = (object) [];
        return new ControllerResponse($success, $message, $returnData);
    }

    /**
     * @method PublicController::activateUser()
     * Attempt to activate a new user account.
     *
     * @param string $_POST['data']
     * A JSON-encoded string containing the keys:
     *  `userId`            The user's ID as recorded in the database.
     *  `activationCode`    The activation code given to the user at signup.
     *
     * @return ControllerResponse
     * Returns a ControllerResponse. The `data` property will contain the
     * following keys:
     *  `success`           Indicates whether the user was activated.
     *  `userId`            The activated user's ID.
     *  `activationCode`    The code used to activate the user.
     *  `message`           A message regarding the result.
     */
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

    /**
     * @method PublicController::auth()
     * Attempt a user login.
     *
     * @param string $_POST['data']
     * A JSON-encoded string containing the following keys:
     *  `un`    The user's email (sic).
     *  `pw`    The user's password.
     *
     * @return ControllerResponse
     * The `data` property will contain the following keys:
     *  `email`         The user's email.
     *  `firstName`     The user's first name.
     *  `lastName`      The user's last name.
     *  `message`       A message regarding the result.
     *  `userId`        The user's ID.
     *  `username`      The user's username.
     */
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

    /**
     * @method PublicController::checkUserIsLoggedIn()
     * Check whether a user logged in.
     *
     * @return ControllerResponse
     * The `data` property will contain the following keys:
     *  `email`         The logged-in user's email.
     *  `isLoggedIn`    Whether a user is logged in.
     *  `firstName`     The logged-in user's first name.
     *  `lastName`      The logged-in user's last name.
     *  `message`       A message regarding the result.
     *  `success`       Whether the check completed without error.
     *  `userId`        The logged-in user's ID.
     *  `username`      The logged-in user's username.
     *
     * If `isLoggedIn` is false, the rest of the keys (except `success` and
     * `message`) will contain null values.
     */
    public function checkUserIsLoggedIn() {

        $success = true;
        $user = $this->userMgr->getCurrentUser();
        if ($this->userMgr->isLoggedIn() === true) {

            $user = $user->getDetails();
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

    /**
     * @method PublicController::generateNewActivationLink()
     * Generate a new Activation record for a user and send them another
     * activation link via email.
     *
     * @param string $_POST['data']
     * A JSON-encoded string containing the following keys:
     *  `userId`    The user's ID.
     *
     * @return ControllerResponse
     * The `data` property will contain the following keys:
     *  `success`   Whether a new activation record was generated and an
     *              email sent.
     *  `userId`    The user's ID.
     *  `code`      The new activation code.
     *  `message`   A message regarding the result.
     */
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

    /**
     * @method PublicController::getPlants()
     * Get the varieties and individuals associated with a user.
     *
     * @return ControllerResponse
     */
    public function getPlants() {

        $user = $this->userMgr->getCurrentUser();
        if (empty($user)) {

            $varieties = [];
            $success = false;
            $message = "No user logged in.";
        }
        else {

            $varieties = Variety::where('user_id', '=', $user->getDetails()->id)->get();
            $success = true;
            $messgae = "Loaded plants.";
        }
        return new ControllerResponse($success, $message, (object)[
            "individuals" => [],
            "varieties" => $varieties,
        ]);
    }

    /**
     * @method PublicController::registerUser()
     * Register a new site user.
     *
     * @param string $_POST['data']
     * A JSON-encoded data object containing these properties:
     * `emailAddress`   The new user's email address.
     * `username`       The new user's username.
     * `firstName`      The new user's first name.
     * `lastName`       The new user's last name.
     * `password`       The new user's new password.
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
     * A JSON-encoded object containing the following keys:
     * `fieldType`  The field to validate. Supported fields are found under
     *              the `$validators` array. To add a new field, create a new
     *              private method and add its name to the array.
     * `userInput`  The user's input.
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

    /**
     * @method PublicController::addUserRecord()
     * Add a `user` record and a `username` record.
     *
     * @param object $userInfo
     *  `emailAddress`  The new user's email address.
     *  `username`      The new username.
     *  `password`      The new password.
     *  `firstName`     The new user's first name.
     *  `lastName`      The new user's last name.
     *
     * @return JackBradford\Disphatch\Etc\User
     */
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

    /**
     * @method PublicController::sendActivationEmail()
     * Send a user a welcome email, which contains a link to activate their
     * account.
     *
     * @param Activation $activation
     * The activation record generated for the new user.
     *
     * @param string $email
     * The new user's email.
     *
     * @param stirng $name
     * A name to address the recipient by.
     *
     * @return void
     * The method will attempt to call Activation::sendActivationEmail(), which
     * will throw an Exception if it fails.
     */
    private function sendActivationEmail(Activation $activation, $email, $name) {

        $dev = ($this->config->getDirective('dev') === 1) ? true : false;
        $userId = $activation->getDetails()->userId;
        $code = $activation->getDetails()->code;
        $link = "https://plantlo.gg/activate/" . $userId . '/' . $code;

        $subject = 'Welcome to PlantLogg!';
// TODO        $body = $this->getActivationEmailBody();
        $body = (object)[
            'html' => '<p>Thank you for joining PlantLogg!</p>',
            'text' => 'Thank you for joining PlantLogg!',
        ];
        $emailConf = $this->config->getDirective('email')->support_at_plantlogg;
        $recipient = (object) ['address' => $email, 'name' => $name];

        if ($dev === false) $activation->sendActivationEmail(
            $subject,
            $body,
            (object)[
                'host' => $emailConf->host,
                'port' => $emailConf->port,
                'smtp_secure' => $emailConf->smtpSecure,
                'username' => $emailConf->username,
                'password' => $emailConf->password,
                'fromAddress' => $emailConf->defaultFromAddress,
                'fromName' => $emailConf->defaultFromName,
                'recipients' => [$recipient],
                'dkim_domain' => $emailConf->dkimDomain,
                'dkim_private' => $emailConf->dkimPrivate,
                'dkim_selector' => $emailConf->dkimSelector,
                'dkim_passphrase' => $emailConf->dkimPassphrase,
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

