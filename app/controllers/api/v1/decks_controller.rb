class Api::V1::DecksController < ApplicationController
  def index
    @decks = Deck.all
    render json: @decks, adapter: :json
  end

  def create
    data = JSON.parse(request.body.read)
    @new_deck = Deck.new(
      user: current_user,
      name: data['deck']['name'],
      description: data['deck']['description']
    )

    if @new_deck.save
      render json: @new_deck, adapter: :json
    else
      render json: { errors: @new_deck.errors.full_messages }, status: 422
    end
  end
end
