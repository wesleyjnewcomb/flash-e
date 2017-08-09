FactoryGirl.define do
  factory :user do
    provider "google_oauth2"
    uid "117346877858607749947"
    name { Faker::Name.name }
    email { Faker::Internet.email }
    image { Faker::LoremPixel.image("640x640") }
    oauth_token { Faker::Internet.password(130) }
    oauth_expires_at "2017-07-29 13:37:43"
  end
end
