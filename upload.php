<!DOCTYPE html>
<html>
<head>
    <title>GoGreen</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./font-awesome-4.7.0/css/font-awesome.min.css">
    <link href="./css/style.css" rel="stylesheet">
</head>
<body>

<div class="container">

    <div class="row">
        <div class="col-md-12">
            <?php include('menu.php'); ?>
            <div class="jumbotron">
                <h2>GoGreen Document Upload</h2>
                <div id="app"></div>
                <script src="https://sdk.amazonaws.com/js/aws-sdk-2.829.0.js"></script>
                <script src="./s3_photoExample.js"></script>
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

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
