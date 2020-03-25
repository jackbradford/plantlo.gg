--DELETE FROM units;
--DELETE FROM unit_types;
/*
INSERT INTO unit_types
    (unit_type)
    VALUES
    ('length'),
    ('weight'),
    ('temperature'),
    ('volume');
*/
INSERT INTO units
    (unit_type, name, name_plural, abbreviation, symbol)
    VALUES
    (1, 'foot',             'feet',                 'ft.',      ''''        ),
    (1, 'inch',             'inches',               'in.',      '"'         ),
    (1, 'meter',            'meters',               'm',        'm'         ),
    (1, 'centimeter',       'centimeters',          'cm',       'cm'        ),
    (1, 'millimeter',       'millimeters',          'mm',       'mm'        ),
    (2, 'pound',            'pounds',               'lbs.',     'lbs.'      ),
    (2, 'ounce',            'ounces',               'oz.',      'oz.'       ),
    (2, 'kilogram',         'kilograms',            'kg',       'kg'        ),
    (2, 'gram',             'grams',                'g',        'g'         ),
    (2, 'milligram',        'milligrams',           'mg',       'mg'        ),
    (3, 'degree Fahrenheit','degrees Fahrenheit',   '°F',       '°F'        ),
    (3, 'degree Celcius',   'degrees Celcius',      '°C',       '°C'        ),
    (4, 'U.S. gallon',      'U.S. gallons',         'gal',      'gal'       ),
    (4, 'U.S. fluid ounce', 'U.S. fluid ounces',    'fl. oz.',  'fl. oz.'   ),
    (4, 'liter',            'liters',               'L',        'L'         ),
    (4, 'milliliter',       'milliliters',          'mL',       'mL'        );
