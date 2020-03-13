/*
 * The schema for PlantLogg.
 *
 * This schema does not include the database tables/relations neccesary for
 * the Caratlyst Sentinel library, which should be installed before this
 * schema.
 *
 */
USE plantlogg;

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
    unit_type INT(10) UNSIGNED NOT NULL,
    name VARCHAR(30) NOT NULL,
    name_plural VARCHAR(30) NOT NULL,
    abbreviation VARCHAR(10) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_units (id),
    FOREIGN KEY fk_units_unit_types (unit_type) REFERENCES unit_types (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE heights (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    height DECIMAL(6,2) NOT NULL,
    unit INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_heights (user_id, serial),
    FOREIGN KEY fk_mature_heights_units (unit) REFERENCES units (id),
    FOREIGN KEY fk_mature_heights_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE light_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_light_types (user_id, serial),
    FOREIGN KEY fk_light_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE water_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_water_types (user_id, serial),
    FOREIGN KEY fk_water_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE temperature_ranges (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    lower_limit SMALLINT(3) NOT NULL,
    upper_limit SMALLINT(3) NOT NULL,
    not_lower_than SMALLINT(3),
    unit INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_temperature_ranges (user_id, serial),
    FOREIGN KEY fk_temperature_ranges_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE humidity_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_humidity_types (user_id, serial),
    FOREIGN KEY fk_humidity_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE soil_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_soil_types (user_id, serial),
    FOREIGN KEY fk_soil_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE fertilizer_types (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_fertilizer_types (user_id, serial),
    FOREIGN KEY fk_fertilizer_types_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE propagation_methods (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_propagation_methods (user_id, serial),
    FOREIGN KEY fk_propagation_methods_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE pests (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    label VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_pests (user_id, serial),
    FOREIGN KEY fk_pests_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE families (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    family VARCHAR(30) NOT NULL,
    description VARCHAR(200),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_families (user_id, serial),
    FOREIGN KEY fk_families_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE genera (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    family INT(10) UNSIGNED,
    genus VARCHAR(30) NOT NULL,
    description VARCHAR(200),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_genera (user_id, serial),
    FOREIGN KEY fk_genera_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_genera_families (user_id, family) REFERENCES families (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE species (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    genus INT(10) UNSIGNED NOT NULL,
    species VARCHAR(30) NOT NULL,
    description VARCHAR(200),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_species (user_id, serial),
    FOREIGN KEY fk_species_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_species_genera (user_id, genus) REFERENCES genera (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE subspecies (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    species INT(10) UNSIGNED NOT NULL,
    subspecies VARCHAR(30) NOT NULL,
    description VARCHAR(200),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_subspecies (user_id, serial),
    CONSTRAINT uc_users_species_subspecies UNIQUE (user_id, species, serial),
    FOREIGN KEY fk_subspecies_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_subspecies_species (user_id, species) REFERENCES species (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE varieties (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT(10) UNSIGNED NOT NULL,
    species INT(10) UNSIGNED NOT NULL,
    subspecies INT(10) UNSIGNED,
    variety VARCHAR(50),
    origin VARCHAR(30),
    mature_height INT(10) UNSIGNED,
    light INT(10) UNSIGNED,
    water INT(10) UNSIGNED,
    temperature INT(10) UNSIGNED,
    humidity INT(10) UNSIGNED,
    soil INT(10) UNSIGNED,
    fertilizer INT(10) UNSIGNED,
    propagation INT(10) UNSIGNED,
    description VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_varieties (id),
    FOREIGN KEY fk_varieties_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_varieties_heights (user_id, mature_height) REFERENCES heights (user_id, serial),
    FOREIGN KEY fk_varieties_light_types (user_id, light) REFERENCES light_types (user_id, serial),
    FOREIGN KEY fk_varieties_water_types (user_id, water) REFERENCES water_types (user_id, serial),
    FOREIGN KEY fk_varieties_temperature_ranges (user_id, temperature) REFERENCES temperature_ranges (user_id, serial),
    FOREIGN KEY fk_varieties_humidity_types (user_id, humidity) REFERENCES humidity_types (user_id, serial),
    FOREIGN KEY fk_varieties_soil_types (user_id, soil) REFERENCES soil_types (user_id, serial),
    FOREIGN KEY fk_varieties_fertilizer_types (user_id, fertilizer) REFERENCES fertilizer_types (user_id, serial),
    FOREIGN KEY fk_varieties_propagation_methods (user_id, propagation) REFERENCES propagation_methods (user_id, serial),
    FOREIGN KEY fk_varieties_species (user_id, species) REFERENCES species (user_id, serial),
    FOREIGN KEY fk_varieties_subspecies (user_id, subspecies) REFERENCES subspecies (user_id, serial),
    FOREIGN KEY fk_varieties_users_species_subspecies (user_id, species, subspecies) REFERENCES subspecies (user_id, species, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE pests_varieties (
    pest INT(10) UNSIGNED NOT NULL,
    variety INT(10) UNSIGNED NOT NULL,
    user_id INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_pests_varieties (pest, variety),
    FOREIGN KEY fk_pests_varieties_pests (user_id, pest) REFERENCES pests (user_id, serial),
    FOREIGN KEY fk_pests_varieties_varieties (variety) REFERENCES varieties (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE common_names (
    id SMALLINT(5) UNSIGNED NOT NULL,
    variety INT(10) UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_common_names (id),
    FOREIGN KEY fk_common_names_varieties (variety) REFERENCES varieties (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE individuals (
    id INT(10) UNSIGNED NOT NULL,
    user_id INT(10) UNSIGNED NOT NULL,
    serial VARCHAR(10),
    variety INT(10) UNSIGNED NOT NULL,
    nickname VARCHAR(100),
    height INT(10) UNSIGNED,
    light INT(10) UNSIGNED,
    water INT(10) UNSIGNED,
    temperature INT(10) UNSIGNED,
    humidity INT(10) UNSIGNED,
    soil INT(10) UNSIGNED,
    fertilizer INT(10) UNSIGNED,
    description VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_individuals (user_id, id),
    FOREIGN KEY fk_individuals_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_individuals_varieties (variety) REFERENCES varieties (id),
    FOREIGN KEY fk_individuals_heights (user_id, height) REFERENCES heights (user_id, serial),
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
    image_path VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    caption VARCHAR(200),
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_images (user_id, serial),
    FOREIGN KEY fk_images_users (user_id) REFERENCES users (id)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE images_varieties (
    user_id INT(10) UNSIGNED NOT NULL,
    image INT(10) UNSIGNED NOT NULL,
    variety INT(10) UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1, -- can be used to disable the MAPPING, as opposed to the user's IMAGE.
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_images_varieties (variety, image),
    FOREIGN KEY fk_images_varieties_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_images_varieties_varieties (variety) REFERENCES varieties (id),
    FOREIGN KEY fk_images_varieties_images (user_id, image) REFERENCES images (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE images_individuals (
    user_id INT(10) UNSIGNED NOT NULL,
    image INT(10) UNSIGNED NOT NULL,
    individual INT(10) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1, -- can be used to disable the MAPPING, as opposed to the user's IMAGE.
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_images_individuals (user_id, individual, image),
    FOREIGN KEY fk_images_individuals_users (user_id) REFERENCES users (id),
    FOREIGN KEY fk_images_individuals_individuals (user_id, individual) REFERENCES individuals (user_id, id),
    FOREIGN KEY fk_images_individulas_images (user_id, image) REFERENCES images (user_id, serial)
) ENGINE=INNODB DEFAULT CHARACTER SET=utf8;

CREATE TABLE notes (
    user_id INT(10) UNSIGNED NOT NULL,
    serial INT(10) UNSIGNED NOT NULL,
    individual VARCHAR(10) NOT NULL,
    note_content VARCHAR(500) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY pk_notes (user_id, serial),
    FOREIGN KEY fk_notes_individuals (user_id, individual) REFERENCES individuals (user_id, id),
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

