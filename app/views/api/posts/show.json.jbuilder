json.post do
  json.extract! @post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
    json.photoUrl @post.photo.attached? ? @post.photo.url : nil
    
    json.comments @post.comments do |comment|
      json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
    end
    json.likes @post.likes
end