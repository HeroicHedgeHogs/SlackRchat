var dotenv = require('dotenv').config({path: './config.env'});
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var cloudinary = require('cloudinary').v2;


// require middleware
require('./config/middleware.js')(app, express);



// database router
var dbRouter = require('./config/router-DB.js');
app.use('/db', dbRouter)

var giphyRouter = require('./config/router-giphy.js');
app.use('/api', giphyRouter)

var eager_options = {
  width: 200, height: 150, crop: 'scale', format: 'jpg'
};

app.post('/pic', function(request, response) {
  cloudinary.uploader.upload(request.body.pic, {tags : "basic_sample", eager: eager_options}, function(err,image){
    // "eager" parameter accepts a hash (or just a single item). You can pass
    // named transformations or transformation parameters as we do here.
    console.log(image);
    console.log("** Eager Transformations");
    if (err){ console.warn(err);}
    // console.log("* "+image.public_id);
    // console.log("* "+image.eager[0].url);
    response.json({url: image.eager[0].url});
  });
})

// var upload_stream = cloudinary.upload.upload_stream({tags: 'basic_sample'}, function(err, image) {
// })
// var file_reader = fs.createReadStream(filename).pipe(upload_stream);


// cloudinary.uploader.upload("lake.jpg", {tags : "basic_sample", public_id : "blue_lake", eager: eager_options}, function(err,image){
//   // "eager" parameter accepts a hash (or just a single item). You can pass
//   // named transformations or transformation parameters as we do here.
//   console.log();
//   console.log("** Eager Transformations");
//   if (err){ console.warn(err);}
//   console.log("* "+image.public_id);
//   console.log("* "+image.eager[0].url);
//   waitForAllUploads("lake",err,image);
// });

// // require socket
// var http = require('http').Server(app);
// require('./socket/socket.js')(http);
var http = require('http').Server(app);
var socket = require('./socket/socket.js');
var io = require('socket.io')(http);
var organizationName = 'Hack-Reactor-NameSpace'; //hard-coded for now
var hrns = io.of('/'+organizationName); 
//Just one "organization" for now, called HRNS. we can add more later
var currentRoom = '';
hrns.on('connection', 

//Putting the socket code here for now. Having trouble with modularity and passing
//the io socket from the other file to this one

function(socket){

  //Room-specific code

  socket.on('changeRoom', function(room) {
    currentRoom = room;
    socket.join(room);
    console.log("currentRoom",currentRoom);
    // hrns.in(currentRoom).emit('chat message', {text: "A user has connected to the room"}); //commenting out for now because it got distracting
  });

  //user disconnects from room
  console.log('a user connected to:' + socket.id);
  // socket.broadcast.emit('someoneJoin','A user connected');

  //user sends message into room
  socket.on('chat message', function(fromClient){
    // console.log('fromClient: ' + fromClient);
    // console.log('user: ' + fromClient.username);
    // console.log('chat message: ' + fromClient.msg);
    // console.log('room name: ' + fromClient.room, currentRoom);
    hrns.in(currentRoom).emit('chat message', {
      channelName: fromClient.channelName,
      channelID: fromClient.channelID,
      username: fromClient.username,
      text: fromClient.msg
    });
  });

  //user disconnects from room
  socket.on('disconnect', function(){
    console.log('user disconnected');
    var msg = 'A user disconnected';
    socket.broadcast.emit('disconnected',msg);
  });
    
});

//End of socket code. Can bring that back to the socket file later










//set and run the port and server
app.set('port',process.env.PORT || 3000);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT",port);

app.get('*', function(req, res){
 res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});


//export app
module.exports = app;