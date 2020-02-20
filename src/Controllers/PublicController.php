<?php

namespace JackBradford\Plantlogg;
use JackBradford\Disphatch\Controllers\Controller;
use JackBradford\Disphatch\Controllers\IRequestController;
use JackBradford\Disphatch\Controllers\ControllerResponse;

class PublicController extends Controller implements IRequestController {

    public function home() {

        echo "Home";
    }

    public function registerUser() {

        require_once 'magic_unicorn';
        $email = $this->fromPOST('emailAddress');
        $username = $this->fromPOST('username');
        $password = $this->fromPOST('password');
        $firstName = $this->fromPOST('firstName');
        $lastName = $this->fromPOST('lastName');

        try {

            // Creates a Sentinel user but returns a Disphatch User.
            $user = $this->userMgr->createUser(
                $firstName,
                $lastName,
                $email,
                $password
            );

            $success = true;
            $activation = $user->getActivation();
            $code = $activation->getDetails()->code;
            $activation->sendActivationEmail($email);
            $data = (object)[
                'user' => $user->getDetails(),
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
        error_log($data->fieldType . " ||| " . $data->userInput);
        $result = $this->{ $validator }($data->userInput);
        return new ControllerResponse(
            $result->success,
            $result->message,
            $result
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

