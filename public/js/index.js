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
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (msg) {
    console.log('Location', msg);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});