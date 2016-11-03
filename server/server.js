var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// require middleware
require('./config/middleware.js')(app, express);


// For Socket.io

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('a user has left the room');
  });
});

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '../client/dist/index.html')
// })

//set and run the port and server
app.set('port',process.env.PORT || 3000);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT",port);




//export app
module.exports = app;