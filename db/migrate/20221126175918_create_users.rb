class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :account_type
      t.boolean :has_profile
      t.integer :chef_id
      t.integer :customer_id
      t.timestamps
    end
  end
end
