import consumer from "./consumer"

$(function() {
  var createRoomChannel;

  jQuery(document).on('turbolinks:load', function() {
    var messages;
    messages = $('#messages');
    if (messages.length > 0) {
      createRoomChannel(messages.data('room-id'));
    }
    return $(document).on('keypress', '#message_body', function(event) {
      var message;
      message = event.target.value;
      if (event.keyCode === 13 && message !== '') {
        App.room.speak(message);
        event.target.value = "";
        return event.preventDefault();
      }
    });
  });

  createRoomChannel = function(roomId) {
    return App.room = consumer.subscriptions.create({
      channel: "RoomChannel",
      roomId: roomId
    }, {
      connected: function() {
        return console.log('Connected to RoomChannel');
      },
      disconnected: function() {
        return console.log('Disconnected from RoomChannel');
      },
      received: function(data) {
        console.log('Received message: ' + data['message']);
        return $('#messages').append(data['message']);
      },
      speak: function(message) {
        return this.perform('speak', {
          message: message
        });
      }
    });
  };

}).call(this);
