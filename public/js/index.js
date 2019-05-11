var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'abc@example.com',
    //     text: 'xD'
    // });

    // socket.emit('createMessage', {
    //     from: 'client@msg.com',
    //     text: 'Client message text'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function(msg) {
    console.log('New message', msg);
});