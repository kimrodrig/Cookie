class EventsController < ApplicationController
    def index
        render json: Event.all
    end

    def show
        render json: find_event
    end
    
    def create
        event = Event.create!(event_params)
        render json: event, status: :created
    end

    def destroy
        find_event.destroy
        head :no_content
    end

    private

    def find_event 
        Event.find_by(id: params[:id])
    end

    def event_params
        params.permit(:datetime, :chef_id, :customer_id, :parsed_address, :duration, location: [])
    end
end
