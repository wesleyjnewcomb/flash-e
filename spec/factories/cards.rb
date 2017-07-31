FactoryGirl.define do
  factory :card do
    association :deck, factory: :deck
    side1 { Faker::Lorem.word }
    side2 { Faker::Lorem.word }
  end
end
