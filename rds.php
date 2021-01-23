<?php $navActive="rds"; ?>
<!DOCTYPE html>
<html>
  <head>
      <?php include("head.php"); ?>
  </head>

  <body>
    <div class="container">

	<div class="row">
		<div class="col-md-12">
      <?php include('menu.php'); ?>

			<div class="jumbotron">

      <?php
        include 'rds.conf.php';

        if ($RDS_URL == "") {
          include 'rds-config.php';
        }
        else {
          include 'rds-read-data.php';
        }

      ?>
    </div>
  </div>
</div>
</div>

</body>
</html>
