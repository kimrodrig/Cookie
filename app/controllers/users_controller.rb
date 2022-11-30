class UsersController < ApplicationController

    # skip_before_action :authorized, only: [:create]

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end

    def create
        if !(User.find_by(username: params[:username]))
            user = User.create!(user_params)
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: {signup: "Username taken"}}, status: :unprocessable_entity
        end
    end

    def update
        current_user = User.find(params[:id])
        current_user.update(user_params)
        render json: current_user, status: :ok
    end
    

    private

    def user_params
        params.permit(:id, :username, :password, :account_type, :has_profile, :chef_id, :customer_id)
    end
end
