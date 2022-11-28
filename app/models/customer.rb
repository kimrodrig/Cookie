class Customer < ApplicationRecord
    has_many :events
    has_many :chefs, through: :events

end
