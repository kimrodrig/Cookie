class Customer < ApplicationRecord
    has_many :events
    has_many :chefs, through: :events
    # has_one_attached :image

    # validates :image, :name, :bio, :location, presence: true, allow_blank: false
end
