<?php

namespace JackBradford\Plantlogg;

class RecordProperty {

    private $name;
    private $required;

    public function __construct($name, $required = null) {

        $this->name = $name;
        $this->required = ($required === true) ? true : false;
    }

    public function isRequired() {

        return $this->required;
    }

    public function name() {

        return $this->name;
    }
}

