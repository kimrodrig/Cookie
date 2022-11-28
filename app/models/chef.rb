class Chef < ApplicationRecord
    has_many :events
    has_many :customers, through: :events

    after_create :average_rating, :update_booleans

    def average_rating
        if self.has_ratings
            self.update(:avg_rating => ratings.sum(0.0)/ratings.size)
        end
    end

    def update_booleans
        if self.ratings.size > 0
            self.update(:has_ratings => true)
        end
        if self.reviews.size > 0
            self.update(:has_reviews => true)
        end
    end

    def add_review review
        self.update(:reviews => reviews.push(review))
        self.update_booleans
    end

    def add_rating rating
        self.update(:ratings => ratings.push(rating))
        self.update_booleans
        self.avg_rating
    end

    def update_bio new_bio
        self.update(:bio => new_bio)
    end

    def update_location new_location
        self.update(:location => new_location)
    end

    def update_cuisines new_cuisines
        self.update(:cuisines => new_cuisines)
    end


end
