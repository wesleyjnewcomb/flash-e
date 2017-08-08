class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    begin
      user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: { errors: ['User not found'] }, status: 404
    end
    render json: user, adapter: :json
  end

  def current
    if current_user
      render json: current_user, adapter: :json
    else
      render json: { errors: ['not authorized'] }, status: 401
    end
  end
end
