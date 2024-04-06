const http = require('http').createServer();

const io = require('socket.io')(http, {
	cors: {origin: '*'}
});

io.on('connection', (socket) => {
	console.log('Server detecting client connection');
});

http.listen(3000, () => {
	console.log('Server is running on port 3000');
});