<?php
/**
 *  This file provides the header and <head> for server-rendered pages.
 */
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title><?php echo $this->title; // TODO  ?></title>
        <link rel="stylesheet" type="text/css" href="css/style.css" media="all">
        <link rel="icon" type="image/ico" href="favicon_plantlogg.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="<?php echo $this->metaDesc; // TODO?>">
        <meta name="author" content="Jack Brown">
    </head>
    <body>
        <header>
            <h1>Site Header</h1>
        </header>

