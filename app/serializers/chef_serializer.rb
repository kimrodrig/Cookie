class ChefSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio, :cuisines, :has_ratings, :has_reviews, :reviews, :ratings, :avg_rating, :location
end
