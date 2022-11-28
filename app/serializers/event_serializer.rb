class EventSerializer < ActiveModel::Serializer
  attributes :id, :datetime, :location, :chef_id, :customer_id
end
