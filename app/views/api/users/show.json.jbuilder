json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at
  end

#json.post do 
#   @user.posts.each do |post|
#     json.set! post.id do 
#        json.extract! 
#      end
# end
#end