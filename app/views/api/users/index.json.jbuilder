json.users do
    @users.each do |user|
      json.set! user.id do
        json.extract! user, :id, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at
      end
    end
  end