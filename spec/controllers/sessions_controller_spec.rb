require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'POST#create' do
    before(:each) do
      auth = OmniAuth::AuthHash.new(Faker::Omniauth.google)
      request.env['omniauth.auth'] = auth
      @user = User.from_omniauth(auth)
    end

    it 'sets the current user session based on the OmniAuth' do
      post :create
      expect(session[:user_id]).to eq(@user.id)
    end

    it 'redirects to the root path' do
      post :create
      expect(response).to redirect_to("/users/#{@user.id}")
    end
  end

  describe 'DELETE#destroy' do
    it 'sets the current user session based on the OmniAuth' do
      delete :destroy
      expect(session[:user_id]).to eq(nil)
    end

    it 'redirects to the root path' do
      delete :destroy
      expect(response).to redirect_to(root_path)
    end
  end
end
