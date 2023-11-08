json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :bio, :workplace, :education, :profile_picture, :cover_photo, :residence
end

json.posts do 
  @user.posts.each do |post|
    json.set! post.id do 
       json.extract! post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
        json.photoUrl post.photo.attached? ? post.photo.url : nil
        json.comments post.comments do |comment| 
          json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
        end
     end
  end
end

json.comments do 
  @user.comments.each do |comment|
    json.extract! comment, :body, :post_id, :user_id, :created_at, :updated_at
  end
end