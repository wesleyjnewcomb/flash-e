class Api::V1::DecksController < ApplicationController
  def index
    @decks = Deck.all
    render json: @decks, adapter: :json
  end
end
