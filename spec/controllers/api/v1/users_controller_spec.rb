require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET#current' do
    context 'user is signed in' do
      before(:each) do
        @user = FactoryGirl.create(:user)
        session[:user_id] = @user.id
      end
      it 'responds with 200' do
        get :current
        expect(response.status).to eq 200
      end

      it 'renders the id, name, email, and image of the current user' do
        get :current
        returned_json = JSON.parse(response.body)

        expect(returned_json['user']['id']).to eq @user.id
        expect(returned_json['user']['name']).to eq @user.name
        expect(returned_json['user']['email']).to eq @user.email
        expect(returned_json['user']['image']).to eq @user.image
      end
    end

    context 'user is not signed in' do
      it 'responds with 401' do
        get :current
        expect(response.status).to eq 401
      end

      it 'renders an error message' do
        get :current
        returned_json = JSON.parse(response.body)

        expect(returned_json).to include('errors')
      end
    end
  end
end
