# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all

10.times do
  User.create!(
    email: Faker::Internet.unique.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    gender: %w[Male Female Other].sample,
    birthday: Faker::Date.birthday(min_age: 18, max_age: 65),
    password: SecureRandom.hex(8),
    bio: Faker::Quote.famous_last_words,
    workplace: Faker::Company.name,
    residence: Faker::Address.city,
    education: Faker::University.name,
    profile_picture: Faker::Avatar.image(slug: "profile", size: "300x300", format: "png"),
    cover_photo: Faker::Avatar.image(slug: "cover", size: "850x315", format: "png")
  )
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