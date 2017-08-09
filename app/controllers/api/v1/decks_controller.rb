class Api::V1::DecksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if params[:user_id]
      @decks = Deck.where(user_id: params[:user_id])
    else
      @decks = Deck.all
    end
    render json: @decks, adapter: :json
  end

  def show
    unless Deck.exists?(id: params[:id])
      return render json: { errors: 'Deck not found' }, status: 404
    end
    @deck = Deck.find(params[:id])
    render json: @deck, adapter: :json
  end

  def create
    unless current_user
      return render json: { errors: 'Must sign in' }, status: 403
    end
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
    unless current_user
      return render json: { errors: 'Must sign in' }, status: 403
    end

    unless Deck.exists?(id: params[:id])
      return render json: { errors: 'Deck not found' }, status: 404
    end

    @deck = Deck.find(params[:id])
    unless @deck.user == current_user
      return render json: { errors: 'User is not deck creator' }, status: 403
    end
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
      errors << 'Invalid card data' if updated_cards.nil?
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

  def destroy
    unless current_user
      return render json: { errors: 'Must sign in' }, status: 403
    end

    @deck = Deck.find(params[:id])
    unless @deck.user == current_user
      return render json: { errors: 'User is not deck creator' }, status: 403
    end

    @deck.destroy
    render json: { message: 'Deck deleted' }, status: 200
  end
end
