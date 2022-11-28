class CreateChefs < ActiveRecord::Migration[7.0]
  def change
    create_table :chefs do |t|
      t.string :name
      t.string :image
      t.string :bio
      t.string :cuisines, array: true
      t.string :reviews, array: true
      t.integer :ratings, array: true
      t.float :avg_rating
      t.boolean :has_ratings
      t.boolean :has_reviews
      t.float :location, array: true
      t.timestamps
    end
  end
end
