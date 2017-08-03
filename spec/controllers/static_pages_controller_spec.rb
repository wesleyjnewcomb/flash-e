require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
  describe 'GET#show' do
    it 'renders the home show template' do
      get :show
      expect(response).to render_template('static_pages/show')
    end
  end
end
