class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    if User.exists?(params[:id])
      render json: User.find(params[:id]), adapter: :json
    else
      render json: { errors: ['User not found'] }, status: 404
    end
  end

  def current
    if current_user
      render json: current_user, adapter: :json
    else
      render json: { errors: ['not authorized'] }, status: 401
    end
  end
end
