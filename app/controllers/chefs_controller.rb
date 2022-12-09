class ChefsController < ApplicationController
    def index
        render json: Chef.all
    end

    def show
        render json: find_chef
    end

    def create
        chef = Chef.create!(chef_params)
        render json: chef, status: :created
    end

    def update
        find_chef.update!(chef_params)
        render json: find_chef, status: :ok       
    end

    private

    def find_chef 
        Chef.find_by(id: params[:id])
    end

    def chef_params
        params.permit(:name, :image, :bio, :has_ratings, :has_reviews, :avg_rating, cuisines: [], reviews: [], ratings: [], location: [])
    end
end
