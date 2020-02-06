<?php

namespace JackBradford\Plantlogg;
use JackBradford\Disphatch\Controllers\Controller;
use JackBradford\Disphatch\Controllers\IRequestController;

class PublicController extends Controller implements IRequestController {

    public function home() {

        echo "Home";
    }
}

