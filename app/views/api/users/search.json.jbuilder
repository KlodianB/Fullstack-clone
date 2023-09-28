json.users({})

json.users do 
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at, :bio, :workplace, :education, :profile_picture, :cover_photo, :residence
        end
    end
end