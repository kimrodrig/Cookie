class SessionsController < ApplicationController
    # skip_before_action :authorized, only: :create

    def create
        user = User.find_by(username: params[:username])
        if user == nil
            render json: {error: {login: "Invalid username"}}, status: :unauthorized
        elsif user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else 
            render json: {error: {login: "Invalid password"}}, status: :unauthorized
        end
    end

    def destroy
        user = User.find(session[:user_id])
        if user == nil
            render json: {error: {login: "User not logged in"}}, status: :unauthorized
        else 
            session[:user_id] = nil
            head :no_content
        end
    end

end
