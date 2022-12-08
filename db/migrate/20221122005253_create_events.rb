class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.datetime :datetime
      t.float :location, array: true
      t.integer :chef_id
      t.integer :customer_id
      t.string :parsed_address
      t.string :duration
      t.timestamps
    end
  end
end
