/*
 * The schema for PlantLogg.
 *
 * This schema does not include the database tables/relations neccesary for
 * the Caratlyst Sentinel library, which should be installed before this
 * schema.
 *
 */
CREATE DATABASE IF NOT EXISTS houseplants
    CHARACTER SET utf8
    COLLATE utf8_unicode_ci;
GRANT SELECT, INSERT, UPDATE ON houseplants.* TO 'hp'@'localhost';

USE houseplants;

-- e.g. length, weight, temperature, etc.
CREATE TABLE unit_types (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    unit_type VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_unit_types (id),
    CONSTRAINT uc_unit_type UNIQUE (unit_type)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

-- e.g. meter, foot, degree celcius, etc.
CREATE TABLE units (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    unit_type INT(10) NOT NULL,
    name VARCHAR(30) NOT NULL,
    name_plural VARCHAR(30) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_units (id),
    FOREIGN KEY fk_units_unit_types (unit_type) REFERENCES unit_types (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE heights (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    height DECIMAL(6,2) NOT NULL,
    unit INT(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_heights (user_id, serial),
    FOREIGN KEY fk_mature_heights_units (unit) REFERENCES units (id),
    FOREIGN KEY fk_mature_heights_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE light_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_light_types (user_id, serial),
    FOREIGN KEY fk_light_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE water_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_water_types (user_id, serial),
    FOREIGN KEY fk_water_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE temperature_ranges (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    lower_limit SMALLINT(3) NOT NULL,
    upper_limit SMALLINT(3) NOT NULL,
    not_lower_than SMALLINT(3),
    unit INT(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_temperature_ranges (user_id, serial),
    FOREIGN KEY fk_temperature_ranges_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE humidity_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_humidity_types (user_id, serial),
    FOREIGN KEY fk_humidity_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE soil_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_soil_types (user_id, serial),
    FOREIGN KEY fk_soil_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE fertilizer_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_fertilizer_types (user_id, serial),
    FOREIGN KEY fk_fertilizer_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE propagation_methods (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_propagation_methods (user_id, serial),
    FOREIGN KEY fk_propagation_methods_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE pests (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_pests (user_id, serial),
    FOREIGN KEY fk_pests_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE plant_varieties (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    family VARCHAR(30),
    genus VARCHAR(30) NOT NULL,
    species VARCHAR(30) NOT NULL,
    origin VARCHAR(30),
    mature_height INT(10),
    light INT(10),
    water INT(10),
    temperature INT(10),
    humidity INT(10),
    soil INT(10),
    fertilizer INT(10),
    propagation INT(10),
    description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_plant_varieties (id),
    FOREIGN KEY fk_plant_varieties_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_plant_varieties_heights (user_id, mature_height) REFERENCES heights (user_id, serial),
    FOREIGN KEY fk_plant_varieties_light_types (user_id, light) REFERENCES light_types (user_id, serial),
    FOREIGN KEY fk_plant_varieties_water_types (user_id, water) REFERENCES water_types (user_id, serial),
    FOREIGN KEY fk_plant_varieties_temperature_ranges (user_id, temperature) REFERENCES temperature_ranges (user_id, serial),
    FOREIGN KEY fk_plant_varieties_humidity_types (user_id, humidity) REFERENCES humidity_types (user_id, serial),
    FOREIGN KEY fk_plant_varieties_soil_types (user_id, soil) REFERENCES soil_types (user_id, serial),
    FOREIGN KEY fk_plant_varieties_fertilizer_types (user_id, fertilizer) REFERENCES fertilizer_types (user_id, serial),
    FOREIGN KEY fk_plant_varieties_propagation_methods (user_id, propagation) REFERENCES propagation_methods (user_id, serial),

) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE pests_plant_varieties (
    user_id INT(10) UNSIGNED NOT NULL,
    pest INT(10) UNSIGNED NOT NULL,
    plant_variety INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_pests_plant_varieties (pest, plant_variety),
    FOREIGN KEY fk_pests_plant_varieties_pests (user_id, pest) REFERENCES pests (user_id, serial),
    FOREIGN_KEY fk_pests_plant_varieties_plant_varieties (plant_variety) REFERENCES plant_varieties (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE common_names (
    id SMALLINT(5) UNSIGNED NOT NULL,
    plant_variety INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_common_names (id),
    FOREIGN KEY fk_common_names_plant_varieties (plant_variety) REFERENCES plant_varieties (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE individuals (
    user_id INT(10) UNSIGNED NOT NULL,
    serial VARCHAR(10) NOT NULL,
    plant_variety INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    nickname VARCHAR(100),
    height INT(10),
    light INT(10),
    water INT(10),
    temperature INT(10),
    humidity INT(10),
    soil INT(10),
    fertilizer INT(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_individuals (user_id, serial),
    FOREIGN KEY fk_individuals_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_individuals_plant_varieties (plant_variety) REFERENCES plant_varieties (id),
    FOREIGN KEY fk_individuals_heights (user_id, height) REFERENCES heights (user_id, serial)
    FOREIGN KEY fk_individuals_light_types (user_id, light) REFERENCES light_types (user_id, serial),
    FOREIGN KEY fk_individuals_water_types (user_id, water) REFERENCES water_types (user_id, serial),
    FOREIGN KEY fk_individuals_temperature_ranges (user_id, temperature) REFERENCES temperature_ranges (user_id, serial),
    FOREIGN KEY fk_individuals_humidity_types (user_id, humidity) REFERENCES humidity_types (user_id, serial),
    FOREIGN KEY fk_individuals_soil_types (user_id, soil) REFERENCES soil_types (user_id, serial),
    FOREIGN KEY fk_individuals_fertilizer_types (user_id, fertilizer) REFERENCES fertilizer_types (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE images (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_images (user_id, serial),
    FOREIGN KEY fk_images_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE images_plant_varieties (
    user_id INT(10) UNSIGNED NOT NULL,
    image INT(10) UNSIGNED NOT NULL,
    plant_variety INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1, -- can be used to disable the MAPPING, as opposed to the user's IMAGE.
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_images_plant_varieties (plant_variety, image),
    FOREIGN KEY fk_images_plant_varieties_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_images_plant_varieties_plant_varieties (plant_variety) REFERENCES plant_varieties (id),
    FOREIGN KEY fk_images_plant_varieties_images (user_id, image) REFERENCES images (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE images_individuals (
    user_id INT(10) UNSIGNED NOT NULL,
    image INT(10) UNSIGNED NOT NULL,
    individual INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1, -- can be used to disable the MAPPING, as opposed to the user's IMAGE.
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_images_individuals (individual, image),
    FOREIGN KEY fk_images_individuals_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_images_individuals_individuals (user_id, individual) REFERENCES individuals (user_id, serial),
    FOREIGN KEY fk_images_individulas_images (user_id, image) REFERENCES images (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE notes (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    individual VARCHAR(10) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    note_content VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_notes (user_id, serial),
    FOREIGN KEY fk_notes_individuals (user_id, individual) REFERENCES individuals (user_id, serial),
    FOREIGN KEY fk_notes_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE usernames (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT(10) UNSIGNED NOT NULL,
    username VARCHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_usernames (id),
    FOREIGN KEY fk_usernames_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

