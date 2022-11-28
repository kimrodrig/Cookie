class UserSerializer < ActiveModel::Serializer
  attributes :id, :account_type, :has_profile, :chef_id, :customer_id
end
