<?php

namespace JackBradford\Plantlogg;

use Illuminate\Database\Eloquent\Model;

class PlantVariety extends Model {

    /**
     * The table associated with the model.
     *
     * #var string
     */
    protected $table = 'plant_varieties';
    protected $primaryKey = 'id';
    protected $connection;

    public function __construct() {

//        $this->connection = $connection;
    }
}

