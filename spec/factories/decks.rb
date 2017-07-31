FactoryGirl.define do
  factory :deck do
    name { Faker::Food.spice }
    description { Faker::Lorem.paragraph }
    association :user, factory: :user
  end
end
