class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :reviews, :ratings, :avg_rating, :location
end
