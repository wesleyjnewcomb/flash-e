class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  attribute :cards do
    object.cards.map do |card|
      {
        id: card.id,
        side1: card.side1,
        side2: card.side2
      }
    end
  end
  attribute :user do
    user = object.user
    {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image
    }
  end
end
