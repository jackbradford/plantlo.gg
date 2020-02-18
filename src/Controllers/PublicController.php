<?php

namespace JackBradford\Plantlogg;
use JackBradford\Disphatch\Controllers\Controller;
use JackBradford\Disphatch\Controllers\IRequestController;

class PublicController extends Controller implements IRequestController {

    public function home() {

        echo "Home";
    }

    public function validateField() {

        $validators = [
            'emailAddress' => 'validateEmailAddress',
            'username' => 'validateUsername',
        ];

        $validator = $validators[$this->fromPOST('fieldType')];
        $result = $validator($this->fromPOST('value'));
        return new ControllerResponse(
            $result->success,
            $result->message,
            $result
        );
    }

    private function validateEmailAddress(string $address) {

        $success = true;
        return (object) [
            'success' => $success,
            'message' => $message,
            'fieldType' => 'emailAddress'
        ];
    }
}

