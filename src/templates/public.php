<?php
    include_once '/var/www/vhosts/plantlo.gg.dev/src/templates/header.php';
?>
<p>Public Page</p>
<p>This page is using the "public" page template.</p>
<p><?php echo $this->response->getContent(); ?></p>
<?php
    include_once '/var/www/vhosts/plantlo.gg.dev/src/templates/footer.php';
?>

