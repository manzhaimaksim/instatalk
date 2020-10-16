class RoomsController < ApplicationController
  before_action :set_room

  def index
    @rooms = Room.all
    @room = Room.new
  end

  def show
  end

  def create
    @room = Room.create!

    redirect_to @room, notice: 'Room was successfully created'
  end

  private

  def set_room
    @room = Room.find_by(token: params[:token])
  end
end
