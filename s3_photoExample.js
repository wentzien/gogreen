// enables tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

var albumBucketName = "gogreen-doc-hspf";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:b2465937-8bf1-4c7e-aacb-a9ead90c925b";

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: {Bucket: albumBucketName}
});

function listAlbums() {
    let albumNumber = 1;
    s3.listObjects({Delimiter: "/"}, function (err, data) {

        if (err) {
            return alert("There was an error listing your directories: " + err.message);
        } else {
            var albums = data.Contents.map(function (content) {
                var prefix = content.Key;
                var albumName = decodeURIComponent(prefix.replace("/", ""));
                return getHtml([
                    `<tr>
                        <th scope="row">${albumNumber++}</th>
                        <td><span class ='pointer' onclick="viewAlbum('${albumName}')">${albumName}</td>
                        <td><button type="button" onclick="deleteAlbum('${albumName}')" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
                    </tr>`,
                    // "<button onclick=\"deleteAlbum('" + albumName + "')\">X</button>",
                    // "<span class ='pointer' onclick=\"viewAlbum('" + albumName + "')\">",
                    // albumName,
                    // "</span>",
                ]);
            },);
            var message = albums.length ? "": "<p>You do not have any directories. Please Create a directory.";
            var htmlTemplate = [
                "<h3>Directory List</h3>",
                message,
                `<table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Album <i class="fa fa-info-circle" aria-hidden="true" data-bs-toggle="tooltip" data-bs-placement="top" title="Click on a directory name to view it."></i></th>
                            <th scope="col">Action <i class="fa fa-info-circle" aria-hidden="true" data-bs-toggle="tooltip" data-bs-placement="top" title="Click on the X to delete the directory."></i></th>
                        </tr>
                    </thead>
                    <tbody>`,
                getHtml(albums),
                `    </tbody>
                </table>`,
                `<button type="button" class="btn btn-primary" onclick="createAlbum(prompt('Enter Directory Name:'))">Create New Directory</button>`,

                // "<button onclick=\"createAlbum(prompt('Enter Directory Name:'))\">",
                // "Create New Directory",
                // "</button>"
            ];
            document.getElementById("app").innerHTML = getHtml(htmlTemplate);
        }
    });
}

function createAlbum(albumName) {
    albumName = albumName.trim();
    if (!albumName) {
        return alert("Directory names must contain at least one non-space character.");
    }
    if (albumName.indexOf("/") !== -1) {
        return alert("Album names cannot contain slashes.");
    }
    var albumKey = encodeURIComponent(albumName);
    s3.headObject({Key: albumKey}, function (err, data) {
        if (!err) {
            return alert("Album already exists.");
        }
        if (err.code !== "NotFound") {
            return alert("There was an error creating your album: " + err.message);
        }
        s3.putObject({Key: albumKey}, function (err, data) {
            if (err) {
                return alert("There was an error creating your directory: " + err.message);
            }
            alert("Successfully created directory.");
            viewAlbum(albumName);
        });
    });
}

function viewAlbum(albumName) {
    var albumPhotosKey = encodeURIComponent(albumName) + "/";
    s3.listObjects({Prefix: albumPhotosKey}, function (err, data) {
        if (err) {
            return alert("There was an error viewing your directory: " + err.message);
        }
        // 'this' references the AWS.Response instance that represents the response
        var href = this.request.httpRequest.endpoint.href;
        var bucketUrl = href + albumBucketName + "/";

        var photos = data.Contents.map(function (photo) {
            var photoKey = photo.Key;

            var photoUrl = bucketUrl + encodeURIComponent(photoKey);

            var filetype = /[^.]*$/.exec(photoUrl)[0];

            if (filetype.toLowerCase() == "pdf") {
                var url = "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg";
                var htmlFile = '<a href="' + photoUrl + '"><img style="width:128px;height:128px;" src="' + url + '"/><a>';
            } else if (filetype.toLowerCase() == "png" || filetype.toLowerCase() == "jpg" || filetype.toLowerCase() == "jpeg") {
                var htmlFile = '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>';
            } else {
                var url = "https://miro.medium.com/max/2400/1*hFwwQAW45673VGKrMPE2qQ.png";
                var htmlFile = '<img style="width:128px;height:128px;" src="' + url + '"/>';
            }


            return getHtml([
                "<span>",
                "<div>",
                '' + htmlFile + '',
                "</div>",
                "<div>",
                "<button onclick=\"deletePhoto('" +
                albumName +
                "','" +
                photoKey +
                "')\">",
                "X",
                "</button>",
                "<span>",
                photoKey.replace(albumPhotosKey, ""),
                "</span>",
                '<br/>',
                '<br/>',
                "</div>",
                "</span>"
            ]);
        });
        var message = photos.length
            ? "<p>Click on the X to delete the file</p>"
            : "<p>You do not have any files in this directory. Please add files.</p>";
        var htmlTemplate = [
            "<h3>",
            "Directory: " + albumName,
            "</h3>",
            message,
            "<div>",
            getHtml(photos),
            "</div>",
            '<br/>',
            '<input id="photoupload" type="file" accept=".pdf,image/*">',
            '<br/>',
            '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
            "Add File",
            "</button>",
            '<button onclick="listAlbums()">',
            "Back To Directories",
            "</button>"
        ];
        document.getElementById("app").innerHTML = getHtml(htmlTemplate);
    });
}

function addPhoto(albumName) {
    var files = document.getElementById("photoupload").files;
    if (!files.length) {
        return alert("Please choose a file to upload first.");
    }
    var acceptedFiletypes = ["png", "jpg", "pdf", "jpeg"];
    var filetype = /[^/]*$/.exec(files[0].type)[0];
    if (acceptedFiletypes.includes(filetype)) {
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + "/";

        var photoKey = albumPhotosKey + fileName;

        // Use S3 ManagedUpload class as it supports multipart uploads
        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: albumBucketName,
                Key: photoKey,
                Body: file
            }
        });

        var promise = upload.promise();

        promise.then(
            function (data) {
                alert("Successfully uploaded file.");
                viewAlbum(albumName);
            },
            function (err) {
                return alert("There was an error uploading your file: ", err.message);
            }
        );
    } else {
        return alert(filetype + " is not a allowed filetype");
    }
}

function deletePhoto(albumName, photoKey) {
    s3.deleteObject({Key: photoKey}, function (err, data) {
        if (err) {
            return alert("There was an error deleting your file: ", err.message);
        }
        alert("Successfully deleted file.");
        viewAlbum(albumName);
    });
}

function deleteAlbum(albumName) {
    var albumKey = encodeURIComponent(albumName) + "/";
    s3.listObjects({Prefix: albumKey}, function (err, data) {
        if (err) {
            return alert("There was an error deleting your directory: ", err.message);
        }
        var objects = [{Key: albumName}];
        console.log(objects);
        s3.deleteObjects(
            {
                Delete: {Objects: objects, Quiet: true}
            },
            function (err, data) {
                if (err) {
                    return alert("There was an error deleting your directory: ", err.message);
                }
                alert("Successfully deleted directory.");
                listAlbums();
            }
        );
    });
}
