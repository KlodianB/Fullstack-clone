class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post

    has_many :likes, 
    as: :likeable,
    class_name: :Like,
    dependent: :destroy
end
