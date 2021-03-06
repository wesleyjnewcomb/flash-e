require 'rails_helper'

RSpec.describe Api::V1::DecksController, type: :controller do
  describe 'GET#index' do
    let!(:deck) { FactoryGirl.create(:deck) }
    let!(:more_decks) { FactoryGirl.create_list(:deck, 4)}
    it 'renders an array of all decks' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(returned_json).to be_a Hash
      expect(returned_json['decks'].length).to eq 5
    end

    it 'provides the name and description of each deck' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(returned_json['decks'][0]).to be_a Hash
      expect(returned_json['decks'][0]['name']).to eq deck.name
      expect(returned_json['decks'][0]['description']).to eq deck.description
    end

    it 'renders the card info for the deck' do
      cards = FactoryGirl.create_list(:card, 3, deck: deck)
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(returned_json['decks'][0]['cards']).to be_a Array
      returned_json['decks'][0]['cards'].each_with_index do |card, i|
        expect(card['id']).to eq cards[i].id
        expect(card['side1']).to eq cards[i].side1
        expect(card['side2']).to eq cards[i].side2
      end
    end

    context 'when a user id is provided as a param' do
      let!(:user) { FactoryGirl.create(:user) }
      let!(:user_decks) { FactoryGirl.create_list(:deck, 3, user: user)}
      it 'renders an array of all decks created by that user' do
        get :index, params: { user_id: user.id }

        returned_json = JSON.parse(response.body)
        expect(returned_json['decks']).to be_a Array
        expect(returned_json['decks'].length).to eq 3
      end
    end
  end

  describe 'GET#show' do
    let!(:deck) { FactoryGirl.create(:deck) }
    let!(:more_decks) { FactoryGirl.create_list(:deck, 4)}

    it 'renders the data of a deck' do
      get :show, params: { id: deck.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(returned_json).to be_a Hash
      expect(returned_json['deck'].length).to eq 5
    end

    it 'provides the name and description of the deck' do
      get :show, params: { id: deck.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(returned_json['deck']).to be_a Hash
      expect(returned_json['deck']['name']).to eq deck.name
      expect(returned_json['deck']['description']).to eq deck.description
    end

    it 'renders the card info for the deck' do
      cards = FactoryGirl.create_list(:card, 3, deck: deck)
      get :show, params: { id: deck.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'

      expect(returned_json['deck']['cards']).to be_a Array
      returned_json['deck']['cards'].each_with_index do |card, i|
        expect(card['id']).to eq cards[i].id
        expect(card['side1']).to eq cards[i].side1
        expect(card['side2']).to eq cards[i].side2
      end
    end

    it 'responds with 404 if it cannot find the deck' do
      get :show, params: { id: 1 }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 404
      expect(returned_json['errors']).to include('Deck not found')
    end
  end

  describe 'POST#create' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      session[:user_id] = @user.id
    end

    after(:each) { session[:user_id] = nil }

    context 'user is not signed in' do
      it 'responds with 403' do
        session[:user_id] = nil
        deck_data = {
          deck: {
            name: 'deck name',
            description: 'deck description'
          }
        }
        post :create, body: deck_data.to_json
        expect(response.status).to eq 403
      end
    end

    context 'correct data' do
      let(:deck_data) do
        {
          deck: {
            name: 'deck name',
            description: 'deck description'
          }
        }
      end
      it 'creates a new Deck' do
        expect do
          post :create, body: deck_data.to_json
        end.to change { Deck.count }.by 1
      end

      it 'renders a status of 201' do
        post :create, body: deck_data.to_json
        expect(response.status).to eq 200
      end

      it 'renders a JSON representing the new Deck' do
        post :create, body: deck_data.to_json
        returned_json = JSON.parse(response.body)
        expect(returned_json['deck']['name']).to eq deck_data[:deck][:name]
        expect(returned_json['deck']['description']).to eq deck_data[:deck][:description]
        user_data = returned_json['deck']['user']
        expect(user_data['id']).to eq @user.id
      end
    end

    context 'incorrect data' do
      let(:deck_data) do
        {
          deck: {
            description: 'deck description'
          }
        }
      end
      it 'does not create a new Deck' do
        expect do
          post :create, body: deck_data.to_json
        end.to change { Deck.count }.by 0
      end

      it 'renders a status of 422' do
        post :create, body: deck_data.to_json
        expect(response.status).to eq 422
      end
    end
  end

  describe 'PATCH#update' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      session[:user_id] = @user.id
    end

    let(:deck) { FactoryGirl.create(:deck, user: @user) }
    let(:cards) { FactoryGirl.create_list(:card, 5, deck: deck) }

    context 'user is not signed in' do
      it 'responds with 403' do
        session[:user_id] = nil
        deck_data = {
          deck: {
            name: 'deck name',
            description: 'deck description'
          }
        }
        patch :update, params: { id: deck.id }, body: deck_data.to_json
        expect(response.status).to eq 403
      end
    end

    context 'user is not deck creator' do
      it 'responds with 403' do
        other_user = FactoryGirl.create(:user)
        session[:user_id] = other_user.id
        deck_data = {
          deck: {
            name: 'deck name',
            description: 'deck description'
          }
        }
        patch :update, params: { id: deck.id }, body: deck_data.to_json
        expect(response.status).to eq 403
      end
    end

    it 'responds with 404 if it cannot find the deck' do
      deck_data = {
        deck: {
          name: 'deck name',
          description: 'deck description'
        }
      }
      patch :update, params: { id: 1 }, body: deck_data.to_json
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 404
      expect(returned_json['errors']).to include('Deck not found')
    end

    context 'updating name and description' do
      let(:deck_data) do
        {
          deck: {
            name: 'new name',
            description: 'new description'
          }
        }
      end

      let(:bad_deck_data) do
        {
          deck: {
            name: nil,
            description: 'new description'
          }
        }
      end

      it 'updates the name and description' do
        id = deck.id
        patch :update, params: { id: id }, body: deck_data.to_json
        expect(response.status).to eq 200
        deck = Deck.find(id)
        expect(deck.name).to eq deck_data[:deck][:name]
        expect(deck.description).to eq deck_data[:deck][:description]
      end

      it 'does not update with bad data' do
        id = deck.id
        patch :update, params: { id: id }, body: bad_deck_data.to_json
        expect(response.status).to eq 422
      end
    end

    context 'adding cards' do
      let(:deck_data) do
        {
          deck: {
            newCards: [
              { side1: 'new card 1 side 1', side2: 'new card 1 side 2' },
              { side1: 'new card 2 side 1', side2: 'new card 2 side 2' }
            ]
          }
        }
      end

      let(:bad_deck_data) do
        {
          deck: {
            newCards: [
              { side1: '', side2: 'new card 1 side 2' },
              { side1: 'new card 2 side 1', side2: 'new card 2 side 2' }
            ]
          }
        }
      end

      it 'creates new cards' do
        id = deck.id
        expect do
          patch :update, params: { id: id }, body: deck_data.to_json
        end.to change { Card.count }.by 2
      end

      it 'creates the correct cards' do
        patch :update, params: { id: deck.id }, body: deck_data.to_json

        expect(Card.exists?(
          side1: 'new card 1 side 1',
          side2: 'new card 1 side 2'
        )).to eq true
        expect(Card.exists?(
          side1: 'new card 2 side 1',
          side2: 'new card 2 side 2'
        )).to eq true
      end

      it 'does not create any cards if the data is invalid' do
        expect do
          patch :update, params: { id: deck.id }, body: bad_deck_data.to_json
        end.to change { Card.count }.by 0

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 422
        expect(returned_json['errors']).to include('Invalid new card data')
      end
    end

    context 'updating cards' do
      let(:deck_data) do
        {
          deck: {
            cards: [
              { id: cards[0].id, side1: 'side 1', side2: 'side 2' },
              { id: cards[2].id, side1: 'side 1', side2: 'side 2' }
            ]
          }
        }
      end

      it 'updates cards' do
        cards
        expect do
          patch :update, params: { id: deck.id }, body: deck_data.to_json
        end.to change { Card.count }.by 0
        updated_card1 = Card.find(deck_data[:deck][:cards][0][:id])
        updated_card2 = Card.find(deck_data[:deck][:cards][1][:id])

        expect(updated_card1.side1).to eq 'side 1'
        expect(updated_card1.side2).to eq 'side 2'
        expect(updated_card2.side1).to eq 'side 1'
        expect(updated_card2.side2).to eq 'side 2'
      end

      it 'does not update cards if the data is invalid' do
        bad_deck_data = {
          deck: {
            cards: [
              { id: cards[0].id, side1: '', side2: 'side 2' },
              { id: cards[2].id, side1: 'side 1', side2: 'side 2' }
            ]
          }
        }
        patch :update, params: { id: deck.id }, body: bad_deck_data.to_json

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 422
        expect(returned_json['errors']).to include('Invalid card data')
      end
    end

    context 'deleting cards' do
      let(:deck_data) do
        {
          deck: {
            deletedCards: [ cards[1].id, cards[2].id ]
          }
        }
      end

      it 'deletes only the cards with the ids provided' do
        cards
        expect do
          patch :update, params: { id: deck.id }, body: deck_data.to_json
        end.to change { Card.count }.by -2

        expect(deck.cards).to include(cards[0])
        expect(deck.cards).not_to include(cards[1])
        expect(deck.cards).not_to include(cards[2])
        expect(deck.cards).to include(cards[3])
        expect(deck.cards).to include(cards[4])
      end
    end
  end

  describe 'DELETE#destroy' do
    context 'when the current user is the owner' do
      before(:each) do
        @user = FactoryGirl.create(:user)
        session[:user_id] = @user.id
      end
      let!(:deck) { FactoryGirl.create(:deck, user: @user) }
      it 'deletes the deck' do
        delete :destroy, params: { id: deck.id }

        expect(Deck.exists?(id: deck.id)).to eq false
      end

      it 'deletes all the cards for that deck' do
        FactoryGirl.create_list(:card, 5, deck: deck)
        delete :destroy, params: { id: deck.id }

        expect(Card.where(deck_id: deck.id).length).to eq 0
      end

      it 'responds with with 200' do
        delete :destroy, params: { id: deck.id }

        expect(response.status).to eq 200
      end
    end

    context 'when the current user is not the owner' do
      let!(:deck) { FactoryGirl.create(:deck) }
      before(:each) do
        @user = FactoryGirl.create(:user)
        session[:user_id] = @user.id
      end

      it 'does not delete the deck' do
        delete :destroy, params: { id: deck.id }
        expect(Deck.exists?(id: deck.id)).to eq true
      end

      it 'responds with 403' do
        delete :destroy, params: { id: deck.id }

        expect(response.status).to eq 403
      end
    end

    context 'when the user is not signed in' do
      let!(:deck) { FactoryGirl.create(:deck) }
      it 'does not delete the deck' do
        delete :destroy, params: { id: deck.id }

        expect(Deck.exists?(id: deck.id)).to eq true
      end

      it 'responds with 403' do
        delete :destroy, params: { id: deck.id }

        expect(response.status).to eq 403
      end
    end
  end
end
