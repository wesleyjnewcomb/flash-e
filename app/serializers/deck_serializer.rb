class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :cards
end
