json.posts do
    @posts.each do |post|
      json.set! post.id do
        json.extract! post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
          json.photoUrl post.photo.attached? ? post.photo.url : nil
          json.likes post.likes

          json.comments post.comments do |comment|
            json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
            json.likes comment.likes
          end
      end
    end
  end