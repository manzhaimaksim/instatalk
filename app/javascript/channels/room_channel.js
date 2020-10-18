import consumer from "./consumer"

let room_id;

$(document).on('turbolinks:load', function () {
  consumer.subscriptions.create({
    channel: "RoomChannel",
    roomId: $('#messages').attr('data-room-id')
  },
  {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('Connected to RoomChannel')
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
      console.log('Disconnected from RoomChannel')
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log('Received data: ' + data['message'])
    },

    speak: function() {
      return this.perform('speak');
    }
  });
})
