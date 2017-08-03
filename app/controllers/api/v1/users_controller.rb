class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def current
    if current_user
      render json: current_user, adapter: :json
    else
      render json: { errors: ['not authorized'] }, status: 401
    end
  end
end
