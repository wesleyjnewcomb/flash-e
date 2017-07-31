class Deck < ApplicationRecord
  belongs_to :user
  has_many :cards
  validates :name, presence: true
end
