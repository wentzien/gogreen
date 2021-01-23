<?php $navActive="load"; ?>
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

                <?php include('put-cpu-load.php'); ?>

                <hr/>

                <?php include('get-cpu-load.php'); ?>

                </p>
                <p>
                </p>
            </div>
        </div>
    </div>
</div>

<script src="js/scripts.js"></script>
</body>
</html>
