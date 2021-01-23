<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?><!DOCTYPE html>
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
                <p>
                    <?php include("get-index-meta-data.php"); ?>

                <hr/>

                <?php include('get-cpu-load.php'); ?>
                </p>
                <p>
                </p>
            </div>
        </div>
    </div>
</div>

</body>
</html>
