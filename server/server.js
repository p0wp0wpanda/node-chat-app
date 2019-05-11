const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'xyz@example.com',
    //     text: 'Email text'
    // });

    socket.emit('newMessage', {
        from: 'server@msg.com',
        text: 'Message text',
        createdAt: 11052018
    });

    socket.on('createMessage', (msg) => {
        console.log(msg);
    });

    // socket.on('createEmail', (email) => {
    //     console.log(email);
    // });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

server.listen(port, () => {
    console.log(`server spooled up on port ${port}`);
});