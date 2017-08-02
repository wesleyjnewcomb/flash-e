class Deck < ApplicationRecord
  belongs_to :user
  has_many :cards
  validates :name, presence: true

  def create_cards(card_data_array)
    cards = card_data_array.map do |card_data|
      attributes = {
        deck: self,
        side1: card_data['side1'],
        side2: card_data['side2']
      }
      Card.new(attributes)
    end

    cards.each do |card|
      return nil unless card.save
    end
    cards
  end

  def update_cards(card_data_array)
    updated_cards = []
    card_data_array.each do |card_data|
      card = Card.find(card_data['id'])
      card.side1 = card_data['side1']
      card.side2 = card_data['side2']
      if card.valid?
        if card.changed?
          card.save
          updated_cards << card
        end
      else
        return nil
      end
    end
    updated_cards
  end
end
