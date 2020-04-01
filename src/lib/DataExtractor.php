<?php

namespace JackBradford\Plantlogg;

class DataExtractor {

    /**
     * @method DataExtractor::extract_genera_data()
     * Extract the data necessary to create a `Genera` record from an array
     * containing the listed properties.
     *
     * @see $properties
     * The keys of this array should match the keys in the supplied data.
     *
     * @param array $data
     * The array to extract the record data from.
     *
     * @return mixed
     * Returns FALSE if required fields were missing from the supplied data.
     * Returns an array with keys that match the table properties as defined
     * in the schema.
     */
    public static function extract_genera_data(array $data, $schema) {

        $properties = [
            'userId' => new RecordProperty('user_id', true),
            'genusSerial' => new RecordProperty('serial', true),
            'familyId' => new RecordProperty('family'),
            'genusName' => new RecordProperty('genus', true),
            'genusDescription' => new RecordProperty('description'),
        ];
        return self::extractData($data, $properties);
    }

    private static function extractData($data, $properties) {

        $values = [];
        foreach ($properties as $label => $p) {

            $values[$p->name()] = [
                'required' => $p->isRequired(),
                'data' => $data[$label],
            ];
        }
        return (self::recordIsValid($values)) ? false : $values;
    }

    private static function recordIsValid($values) {

        foreach ($values as $value) {

            if ($value['required'] === true && $value['data'] === null) {
                return false;
            }
        }
        return true;
    }
}

