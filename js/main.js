$(document).ready(function() {
  console.log('App Started');

  var socket = io('http://brand.nioinstances.com');

  socket.on('connect', function() {
    console.log('Connected');
    socket.emit('ready', 'gabriel');
  });

  socket.on('recvData', function(data) {
    console.log(data);
  });
  
});
