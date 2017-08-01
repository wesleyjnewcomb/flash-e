require 'rails_helper'

RSpec.describe Deck, type: :model do
  it { should validate_presence_of :name }
  it { should belong_to :user }
  it { should have_many :cards }

  describe '#create_cards' do
    let(:deck) { FactoryGirl.create(:deck) }
    let(:card_data) do
      [
        { 'side1' => 'card 1 side 1', 'side2' => 'card 1 side 2' },
        { 'side1' => 'card 2 side 1', 'side2' => 'card 2 side 2' }
      ]
    end
    it 'creates cards from the data it is passed' do
      deck.create_cards(card_data)
      expect(deck.cards.length).to eq 2
      expect(deck.cards[0].side1).to eq 'card 1 side 1'
      expect(deck.cards[0].side2).to eq 'card 1 side 2'
      expect(deck.cards[1].side1).to eq 'card 2 side 1'
      expect(deck.cards[1].side2).to eq 'card 2 side 2'
    end

    it 'returns the cards it created' do
      new_cards = deck.create_cards(card_data)
      expect(new_cards).to be_a Array
      expect(new_cards[0].persisted?).to eq true
      expect(new_cards[0].side1).to eq 'card 1 side 1'
      expect(new_cards[0].side2).to eq 'card 1 side 2'
      expect(new_cards[1].persisted?).to eq true
      expect(new_cards[1].side1).to eq 'card 2 side 1'
      expect(new_cards[1].side2).to eq 'card 2 side 2'
    end

    it 'returns nil if the data is invalid' do
      bad_card_data = [
        { 'side1' => 'no side 2' }
      ]

      expect(deck.create_cards(bad_card_data)).to eq nil
      expect(deck.cards.length).to eq 0
    end
  end

  describe '#update_cards' do
    let(:deck) { FactoryGirl.create(:deck) }
    let(:card1) { FactoryGirl.create(:card) }
    let(:card2) { FactoryGirl.create(:card) }
    let(:card3) { FactoryGirl.create(:card) }
    let(:card_data) do
      [
        { 'id' => card1.id, 'side1' => 'card 1 side 1', 'side2' => 'card 1 side 2' },
        { 'id' => card2.id, 'side1' => 'card 2 side 1', 'side2' => 'card 2 side 2' },
        { 'id' => card3.id, 'side1' => card3.side1, 'side2' => card3.side2 }
      ]
    end

    it 'updates cards from the data it is passed' do
      id1 = card1.id
      id2 = card2.id
      deck.update_cards(card_data)
      card1 = Card.find(id1)
      card2 = Card.find(id2)
      expect(card1.side1).to eq 'card 1 side 1'
      expect(card1.side2).to eq 'card 1 side 2'
      expect(card2.side1).to eq 'card 2 side 1'
      expect(card2.side2).to eq 'card 2 side 2'
    end

    it 'returns only the cards that have been changed' do
      updated_cards = deck.update_cards(card_data)

      expect(updated_cards.include?(card1)).to be true
      expect(updated_cards.include?(card2)).to be true
      expect(updated_cards.include?(card3)).to be false
    end

    it 'returns nil if the changes were invalid' do
      bad_card_data = [
        { 'id' => card1.id, 'side1' => '', 'side2' => '' }
      ]

      expect(deck.update_cards(bad_card_data)).to eq nil
    end
  end
end
