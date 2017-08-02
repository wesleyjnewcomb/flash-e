require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  describe 'GET#show' do
    it 'renders the home show template' do
      get :show
      expect(response).to render_template('home/show')
    end
  end
end
