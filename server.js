var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('user connected');
	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
	
server.listen(process.env.PORT || 3000, function(){
	console.log("Server listening.");
});
