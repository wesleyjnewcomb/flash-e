class Card < ApplicationRecord
  belongs_to :deck

  validates :deck, presence: true
end
