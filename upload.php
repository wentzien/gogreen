.<!DOCTYPE html>
<html>
  <head>
     <!-- **DO THIS**: -->
    <!--   Replace SDK_VERSION_NUMBER with the current SDK version number -->
      <link href="./css/style.css" rel="stylesheet">
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.829.0.js"></script>
    <script src="./s3_photoExample.js"></script>.
    <script>
       function getHtml(template) {
          return template.join('\n');
       }
       listAlbums();
    </script>
  </head>
  <body>
    <h1>GoGreen Document Upload</h1>
    <div id="app"></div>
  </body>
</html>
