#!/bin/bash

# This script is responsible for deploying the app to the production
# server after a push via git.

cd /var/www/vhosts/plantlo.gg
sass --update /var/www/vhosts/plantlo.gg/htdocs/css/scss/style.scss:/var/www/vhosts/plantlo.gg/htdocs/css/style.css
sudo cp /var/www/vhosts/plantlo.gg/config/plantlo.gg.conf /etc/apache2/sites-available/plantlo.gg.conf
sudo cp /var/www/vhosts/plantlo.gg/config/plantlo.gg-le-ssl.conf /etc/apache2/sites-available/plantlo.gg-le-ssl.conf
sudo systemctl restart apache2
npm run build-prod

