class CustomersController < ApplicationController
    def index
        render json: Customer.all
    end

    def show
        render json: find_customer
    end


    private

    def find_customer
        Customer.find_by(id: params[:id])
    end
end
