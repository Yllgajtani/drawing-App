const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Import socket.io properly

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Instantiate Server using 'new'

app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data); // Broadcast drawing data to other clients
    });

    socket.on('clearCanvas', () => {
        io.emit('clearCanvas'); // Emit clearCanvas to all clients
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});

// Define the port
const PORT = 2500;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
