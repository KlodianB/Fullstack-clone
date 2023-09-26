json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :bio, :workplace, :education, :profile_picture, :cover_photo, :residence
end

posts = @user.posts

json.posts do 
  @user.posts.each do |post|
    json.set! post.id do 
       json.extract! post, :body, :author_id, :feed_id, :created_at, :updated_at
     end
  end
end