const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

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

    // socket.emit('newMessage', {
    //     from: 'server@msg.com',
    //     text: 'Message text',
    //     createdAt: 11052018
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (msg, callback) => {
        console.log(msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });

    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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