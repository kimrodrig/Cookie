# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

def cuisines
    array = []
    Faker::Number.within(range: 1..5).times do |x|
        array.push(Faker::Food.ethnic_category)
    end
    return array
end

def reviews
    array = []
    Faker::Number.within(range: 1..5).times do |x|
        array.push(Faker::Lorem.sentences(number: 1)[0])
    end
    return array
end

def ratings
    array = []
    Faker::Number.within(range: 1..5).times do |x|
        array.push(Faker::Number.within(range: 1..5))
    end
    return array
end

30.times do Chef.create!(
    name: Faker::Name.name,
    image: Faker::LoremFlickr.image(size: "200x200", search_terms: ['cooking']),
    bio: Faker::Lorem.paragraph,
    cuisines: cuisines,
    reviews: reviews,
    ratings: ratings,
    avg_rating: Faker::Number.within(range: 1..5), 
    # change above
    has_ratings: true,
    has_reviews: true,
    location: [rand(-74.2..-73.8), rand(40.75..40.9)]
)
end

30.times do Customer.create!(
    name: Faker::Name.name,
    bio: Faker::Lorem.paragraph,
    reviews: reviews,
    ratings: ratings,
    avg_rating: Faker::Number.within(range: 1..5), 
    # change above
    has_ratings: true,
    has_reviews: true,
    location: [Faker::Address.latitude, Faker::Address.longitude]
)
end

10.times do Event.create!(
    datetime: Faker::Time.forward(days: 23),
    location: [Faker::Address.longitude, Faker::Address.latitude],
    chef_id: Faker::Number.within(range: 1..10),
    customer_id: Faker::Number.within(range: 1..10)
)
end
