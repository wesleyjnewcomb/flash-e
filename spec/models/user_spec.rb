require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.from_omniauth' do
    let(:auth) { OmniAuth::AuthHash.new(Faker::Omniauth.google) }
    let(:user) { User.from_omniauth(auth) }

    it 'returns a User' do
      expect(user).to be_a User
    end

    it 'returns a User that is persisted in the database' do
      expect(user.persisted?).to eq true
    end

    it 'sets the user attributes correctly' do
      expect(user.provider).to eq auth.provider
      expect(user.uid).to eq auth.uid
      expect(user.name).to eq auth.info.name
      expect(user.email).to eq auth.info.email
      expect(user.image).to eq auth.info.image
      expect(user.oauth_token).to eq auth.credentials.token
      expect(user.oauth_expires_at).to eq Time.at(auth.credentials.expires_at)
    end
  end
end
