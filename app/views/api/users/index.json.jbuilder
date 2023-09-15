json.users do
    @users.each do |user|
      json.set! user.id do
        json.extract! user, :id, :first_name, :last_name
        # Add any other attributes as necessary.
      end
    end
  end