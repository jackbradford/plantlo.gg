<?php

namespace JackBradford\Plantlogg;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Variety extends Model {

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

    /**
     * Set the keys for a save update query. This method overrides
     * the parent class's version such that it can support composite
     * primary keys.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function setKeysForSaveQuery(Builder $query) {

        $query->where($this->getKeyName(), '=', $this->getKeyForSaveQuery());

        return $query;
    }
}

