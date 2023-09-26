# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all


10.times do
  user = User.create!(
    email: Faker::Internet.unique.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    gender: Faker::Gender.binary_type,
    birthday: Faker::Date.birthday(min_age: 18, max_age: 65), 
    password: SecureRandom.hex(8),
    bio: Faker::Lorem.paragraph,
    workplace: Faker::Company.name,
    education: Faker::University.name,
    profile_picture: Faker::Avatar.image, 
    cover_photo: Faker::LoremFlickr.image,
    residence: Faker::Address.city
  )
  
  # Creating posts for each user
  5.times do
    Post.create!(
      body: Faker::Lorem.sentence,
      author_id: user.id, # associate post to the user
      feed_id: user.id # associate post to the user's feed, adjust if your logic is different
    )
  end
end

# This will ensure each user has some posts from other users in their feed
User.all.each do |user|
  other_users = User.where.not(id: user.id)
  other_users.each do |other_user|
    if rand < 0.2 # 20% chance for each user to have a post in another user's feed
      Post.create!(
        body: Faker::Lorem.sentence,
        author_id: other_user.id,
        feed_id: user.id
      )
    end
  end
end

User.create!(
    email: "testingstuff@gmail.com",
    first_name: "Klodian",
    last_name: "Behrami",
    gender: "Male",
    birthday: Faker::Date.birthday(min_age: 18),
    password: "password",
    bio: Faker::Quote.famous_last_words,
    workplace: Faker::Company.name,
    residence: Faker::Address.city,
    education: Faker::University.name,
    profile_picture: Faker::Avatar.image(slug: "profile", size: "300x300", format: "png"),
    cover_photo: Faker::Avatar.image(slug: "cover", size: "850x315", format: "png")
  )