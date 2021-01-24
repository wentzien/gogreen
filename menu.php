<nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: white !important; margin-bottom: 10px; margin-top: 10px">
    <a class="navbar-brand" href="/">
        <img src="gogreenLogo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        GoGreen
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item <?php if($navActive == "load") echo "active" ?>">
                <a class="nav-link" href="load.php">Load Test</a>
            </li>
            <li class="nav-item <?php if($navActive == "rds") echo "active" ?>">
                <a class="nav-link" href="rds.php">RDS</a>
            </li>
            <li class="nav-item <?php if($navActive == "upload") echo "active" ?>">
                <a class="nav-link" href="upload.php">Documents</a>
            </li>
        </ul>
    </div>
</nav>


<!--<nav class="nav">-->
<!--    <a class="nav-link active" href="/"><img src="gogreenLogo.png" width="40px" alt="GoGreen"></a>-->
<!--    <a class="nav-link" href="load.php"><bold>GoGreen</bold></a>-->
<!--    <a class="nav-link" href="load.php">Load Test</a>-->
<!--    <a class="nav-link" href="rds.php">RDS</a>-->
<!--    <a class="nav-link disabled" href="upload.php">Upload Documents</a>-->
<!--</nav>-->