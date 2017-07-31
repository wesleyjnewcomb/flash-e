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
end
