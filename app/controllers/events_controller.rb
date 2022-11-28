class EventsController < ApplicationController
    def index
        render json: Event.all
    end

    def show
        render json: find_event
    end
    
    private

    def find_event 
        Event.find_by(id: params[:id])
    end
end
