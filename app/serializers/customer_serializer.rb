class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio, :reviews, :ratings, :avg_rating, :location
  has_many :events
end
