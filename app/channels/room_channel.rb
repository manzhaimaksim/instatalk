class RoomChannel < ApplicationCable::Channel
  def subscribed
    logger.info "Subscribed to RoomChannel, roomId: #{params[:roomId]}"

    @room = Room.find(params[:roomId])

    stream_from "room_channel_#{@room.id}"

    speak('message' => '* * * joined the room * * *')
  end

  def unsubscribed
    logger.info "Unsubscribed to RoomChannel"

    speak('message' => '* * * left the room * * *')
  end

  def speak(data)
    logger.info "RoomChannel, speak: #{data.inspect}"

     MessageService.new(
        body: data['message'], user: current_user, room: @room
     ).perform
  end
end
