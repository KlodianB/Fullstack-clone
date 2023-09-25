class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :bio, :string
    add_column :users, :workplace, :string
    add_column :users, :education, :string
    add_column :users, :profile_picture, :string
    add_column :users, :cover_photo, :string
  end
end
