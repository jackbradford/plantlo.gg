CREATE DATABASE IF NOT EXISTS plantlogg
    CHARACTER SET utf8
    COLLATE utf8_unicode_ci;
GRANT SELECT, INSERT, UPDATE ON plantlogg.* TO 'plantlogg'@'localhost';

