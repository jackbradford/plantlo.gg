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

    public function registerUser() {

        $data = json_decode($this->fromPOST('data'));
        $email = $data->emailAddress;
        $username = $data->username;
        $firstName = $data->firstName;
        $lastName = $data->lastName;

        // TODO ensure username <36 characters.

        try {

            // Creates a Sentinel user but returns a Disphatch User.
            $user = $this->addUserRecord($data);
            $activation = $user->getActivation();
            $code = $activation->getDetails()->code;
            $recipName = (!empty($firstName) && !empty($lastName))
                ? $firstName . ' ' . $lastName
                : $username;

            $this->sendActivationEmail($activation, $email, $recipName);

            /*
            $activation->sendActivationEmail($email, $subject, $body, (object)[]);
             */

            $success = true;
            $data = (object)[
                'user' => $user->getDetails(),
                'username' => $username,
                'activation_code' => $code,
            ];
            $cliMsg = 'User added successfully. Activation code: '
                . $data->activation_code;
        }
        catch (\Exception $e) {

            $success = false;
            $cliMessage = $e->getMessage();
            $data = (object) [];
        }
        return new ControllerResponse($success, $cliMsg, $data);
    }

    public function validateField() {

        $validators = [
            'emailAddress' => 'validateEmailAddress',
            'username' => 'validateUsername',
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

        $user = $this->userMgr->createUser(
            $userInfo->firstName,
            $userInfo->lastName,
            $userInfo->emailAddress,
            $userInfo->password
        );
        if (!$this->db->getConnection('default')->insert(
            'INSERT INTO usernames (username, user_id) VALUES (?, ?)',
            [$userInfo->username, $user->getDetails()->id]
        )) {
            $this->userMgr->deleteUser($user->getDetails()->id);
            throw new \Exception('Could not add username.');
        }
        return $user;
    }

    private function sendActivationEmail(Activation $activation, $email, $name) {

        $userId = $activation->getDetails()->userId;
        $code = $activation->getDetails()->code;
        $link = "https://plantlo.gg/activate/" . $userId . '/' . $code;

        $subject = 'Activate your PlantLogg account!';
        $body = '<p>Thank you for joining PlantLogg!</p>';
        $body .= "<p><a href=\"$link\">Click here to activate your account.</a></p>";

        $emailConf = $this->config->getDirective('email');
        $recipient = (object) ['address' => $email, 'name' => $name];
        $activation->sendActivationEmail(
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
    }

    private function validateEmailAddress(string $address) {

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

    private function validateUsername(string $username) {

        $success = true;
        $message = "Username is available.";
        $username = strtolower($username);
        try {

            $results = $this->db->getConnection('default')->select(
                'select * from usernames where username = ?',
                [$username]
            );
        }
        catch (\Exception $e) {

            error_log($e->getMessage());
            $success = false;
            $message = "Internal server error.";
        }
        try {

            if ($results) {

                throw new \Exception('Username is taken.');
            }
            if (!preg_match('/.+/', $username)) {

                throw new \Exception('Username cannot be empty.');
            }
            if (preg_match('/(\W|\d)/', $username)) {

                throw new \Exception('Username may only contain letters.');
            }
        }
        catch (\Exception $e) {

            $success = false;
            $message = $e->getMessage();
        }
        return (object) [
            'success' => $success,
            'message' => $message,
            'fieldType' => 'username'
        ];
    }
}

