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
  end

  describe 'POST#create' do
    before(:each) do
      @user = FactoryGirl.create(:user)
      session[:user_id] = @user.id
    end

    after(:each) { session[:user_id] = nil }


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
end
