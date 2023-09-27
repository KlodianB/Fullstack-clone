json.posts do
    @posts.each do |post|
      json.set! post.id do
        json.extract! post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
          json.photoUrl post.photo.attached? ? post.photo.url : nil
      end
    end
  end