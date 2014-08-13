(function () {

    var serverURL = "http://192.168.0.102:8000",
        $scroller = $('.scroller'),

        // Get List of images from server
        getFeed = function () {
            //$scroller.empty();

            $.ajax({
                url: serverURL + "/images",
                type: "GET",
                success: function(res) {
                    alert('success');
                    alert(res);
                }
            }).done(function (data) {
                var l = data.length;
                alert(data.length);
                for (var i = 0; i < l; i++) {
                    alert(data[i]);
                    $scroller.append('<img src="' + serverURL + '/' + data[i].filename + '"/>');
                }
            });
        },

        // Upload image to server
        upload = function (imageURI) {
            var ft = new FileTransfer(),
                options = new FileUploadOptions();

            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.params = {
                "description": "Uploaded from my phone"
            };

            options.headers = {
                Connection: "close"
            };

             options.params.fullpath = imageURI;
             options.params.name = options.fileName;

            ft.upload(imageURI, serverURL + "/images",
                function (e) {
                    getFeed();
                },
                function (e) {
                    alert("Falha no upload da foto");
                }, options);
        },

        // Take a picture using the camera or select one from the library
        takePicture = function (e) {
            var options = {
                quality: 45,
                targetWidth: 1000,
                targetHeight: 1000,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            navigator.camera.getPicture(
                function (imageURI) {
                    console.log(imageURI);
                    upload(imageURI);
                },
                function (message) {
                    // We typically get here because the use canceled the photo operation. Fail silently.
                }, options);

            return false;

        };

    $('.camera-btn').on('click', takePicture);

    $('.load-images').on('click', function(e) {
        alert('Loading images...');
        getFeed();
    });

    getFeed();

}());
