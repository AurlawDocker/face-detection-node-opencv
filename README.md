# face-detection-node-opencv

Real-time face detection using OpenCV, Node.js, and WebSockets.

Updated to use Browser webcam instead of opencv via node server. This will be eventually moved to a docker image
## Requirements

* [Node.js](http://nodejs.org/)
* [OpenCV 2.4.x](http://opencv.org/)
* A webcam, e.g. laptop-integrated webcam, USB webcam

## Installing Node.js packages

* Navigate to the `server` directory
* `npm i -g node-gyp node-pre-gyp`
* To install the packages: `npm install`

## Running the demo

* Make sure you are still in the `server` directory
* To run the server: `node server.js`
* To run the demo locally, open a browser and go to `localhost:8080`

The app should be up and running!


### Docker Version

```
$ docker-compose up
```

