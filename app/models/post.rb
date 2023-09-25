# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  author_id  :bigint           not null
#  feed_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

    belongs_to :feed, 
    foreign_key: :feed_id, 
    class_name: :User

end
