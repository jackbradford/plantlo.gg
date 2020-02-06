<?php

ini_set('error_reporting', E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', '/var/www/vhosts/plantlo.gg.dev/error.log');

require_once '/var/www/vhosts/plantlo.gg.dev/vendor/autoload.php';
require_once '/var/www/vhosts/plantlo.gg.dev/src/Controllers/PublicController.php';
use JackBradford\Disphatch\Router\Router;

$config = '/var/www/vhosts/plantlo.gg.dev/disphatch.conf.json';
$router = Router::init($config);
$router->routeAndExecuteRequest();
echo "Done.\n";

