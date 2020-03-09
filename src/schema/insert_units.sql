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
    (5, 'foot',             'feet',                 'ft.',      ''''        ),
    (5, 'inch',             'inches',               'in.',      '"'         ),
    (5, 'meter',            'meters',               'm',        'm'         ),
    (5, 'centimeter',       'centimeters',          'cm',       'cm'        ),
    (5, 'millimeter',       'millimeters',          'mm',       'mm'        ),
    (6, 'pound',            'pounds',               'lbs.',     'lbs.'      ),
    (6, 'ounce',            'ounces',               'oz.',      'oz.'       ),
    (6, 'kilogram',         'kilograms',            'kg',       'kg'        ),
    (6, 'gram',             'grams',                'g',        'g'         ),
    (6, 'milligram',        'milligrams',           'mg',       'mg'        ),
    (7, 'degree Fahrenheit','degrees Fahrenheit',   '°F',       '°F'        ),
    (7, 'degree Celcius',   'degrees Celcius',      '°C',       '°C'        ),
    (8, 'U.S. gallon',      'U.S. gallons',         'gal',      'gal'       ),
    (8, 'U.S. fluid ounce', 'U.S. fluid ounces',    'fl. oz.',  'fl. oz.'   ),
    (8, 'liter',            'liters',               'L',        'L'         ),
    (8, 'milliliter',       'milliliters',          'mL',       'mL'        );

