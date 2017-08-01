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

  def update
    @deck = Deck.find(params[:id])
    data = JSON.parse(request.body.read)['deck']
    errors = []
    @deck.name = data['name'] if data.has_key?('name')
    @deck.description = data['description'] if data.has_key?('description')

    if data['newCards'].is_a?(Array)
      created_cards = @deck.create_cards(data['newCards'])
      errors << 'Invalid new card data' if created_cards.nil?
    end

    if data['cards'].is_a?(Array)
      updated_cards = @deck.update_cards(data['cards'])
      errors << 'Invalid card data' if created_cards.nil?
    end

    if data['deletedCards'].is_a?(Array)
      data['deletedCards'].each do |id|
        card = Card.find(id)
        card.destroy
      end
    end

    if @deck.save && errors.empty?
      return render json: @deck, adapter: :json
    else
      errors += @deck.errors.full_messages
    end
    render json: { errors: errors }, status: 422
  end
end
