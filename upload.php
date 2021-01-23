<?php $navActive="upload"; ?>
<!DOCTYPE html>
<html>
<head>
    <?php include("head.php"); ?>
</head>
<body>
<div class="container">
    <?php include('menu.php'); ?>
    <div class="row">
        <div class="col-md-12">
            <div class="jumbotron">
                <h2>GoGreen Document Upload</h2>
                <div id="app"></div>
                <script src="https://sdk.amazonaws.com/js/aws-sdk-2.829.0.js"></script>
                <script src="s3script.js"></script>
                <script>
                    function getHtml(template) {
                        return template.join('\n');
                    }

                    listAlbums();
                </script>
            </div>
        </div>
    </div>
</div>

</body>
</html>
