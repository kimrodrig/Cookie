class CustomersController < ApplicationController
    def index
        render json: Customer.all
    end

    def show
        render json: find_customer
    end

    def create
        customer = Customer.create!(customer_params)
        render json: customer, status: :created
    end

    private

    def find_customer
        Customer.find_by(id: params[:id])
    end

    def customer_params
        params.permit(:name, :bio, :has_ratings, :has_reviews, :avg_rating, reviews: [], ratings: [], location: [])
    end
end
