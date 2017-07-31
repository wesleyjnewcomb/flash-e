class Card < ApplicationRecord
  belongs_to :deck
  validates :side1, presence: true
  validates :side2, presence: true
  validates :deck, presence: true
end
