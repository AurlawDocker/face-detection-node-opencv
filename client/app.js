function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

// MODIFY THIS TO THE APPROPRIATE URL IF IT IS NOT BEING RUN LOCALLY
var socket = io.connect('http://localhost');

var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');

var target = document.getElementById("target");
var targetContext = target.getContext('2d');
var img = new Image();

// show loading notice
targetContext.fillStyle = '#333';
targetContext.fillText('Loading...', target.width/2-30, target.height/3);

var video = document.getElementById("videoElement");

 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    // do something
    console.error(e);
}

timer = setInterval(
            function () {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                var data = canvas.toDataURL('image/jpeg', 1.0);
                newblob = dataURItoBlob(data);
                socket.send(newblob);
}, 250);


socket.on('frame', function (data) {
    var uint8Arr = new Uint8Array(data.buffer);
    var str = String.fromCharCode.apply(null, uint8Arr);
    var base64String = btoa(str);
    // target.src = 'data:image/png;base64,' + base64String;
    img.onload = function () {
      targetContext.drawImage(this, 0, 0, target.width, target.height);
    };
    img.src = 'data:image/png;base64,' + base64String;
  
  // Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
  // var uint8Arr = new Uint8Array(data.buffer);
  // var str = String.fromCharCode.apply(null, uint8Arr);
  // var base64String = btoa(str);

  // img.onload = function () {
  //   context.drawImage(this, 0, 0, canvas.width, canvas.height);
  // };
  // img.src = 'data:image/png;base64,' + base64String;
});