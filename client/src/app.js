var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
socket.on('disconnect', function(){
  console.log('a user has left.... aw man');
  $('#messages').append($('<li>').text('a user has left the room'));
});
      
console.log('Hello World! Why are you so awesome?');