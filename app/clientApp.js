const socket = io('http://localhost:3000');

socket.on('connect', () => {
	console.log('A client has connected to the server');
});