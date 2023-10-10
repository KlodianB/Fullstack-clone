# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Post.destroy_all
User.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('posts')

profile_pictures = [
  "https://media.istockphoto.com/id/1330874290/photo/portrait-of-a-teenage-3d-character.jpg?s=612x612&w=0&k=20&c=mL25zbYDBi0JnXwt0UoYpzeMK6bEbktuVX11yfytz5E=",
  "https://media.istockphoto.com/id/1389898237/photo/cute-girl-iconic-character-with-glasses-3d-rendering.jpg?s=612x612&w=0&k=20&c=dFG5lmBicdNe33IrFgr8YYrX1rF38DljWS7g84Q78HI=",
  "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg",
  "https://images.freeimages.com/images/large-previews/7e8/man-avatar-1632965.jpg",
  "https://images.freeimages.com/images/large-previews/cd5/lady-avatar-1632969.jpg",
  "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg",
  "https://images.freeimages.com/images/large-previews/d66/woman-avatar-1632963.jpg",
  "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg",
  "https://images.freeimages.com/images/large-previews/962/avatar-man-with-mustages-1632966.jpg",
  "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg"
]

cover_photos = [
  "https://images.pexels.com/photos/3274903/pexels-photo-3274903.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1536314/pexels-photo-1536314.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2480232/pexels-photo-2480232.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1090972/pexels-photo-1090972.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/4792427/pexels-photo-4792427.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1535907/pexels-photo-1535907.jpeg?auto=compress&cs=tinysrgb&w=800"
]

bios = [
  "Software Engineer with a love for robust code and efficient algorithms. When I am not coding, I am exploring the world of digital art and animation.",
  "Aspiring Data Scientist with a passion for diving into complex datasets and emerging with insights and strategies. Proud cat mom and coffee enthusiast.",
  "Creative Writer and avid reader. Exploring the world one book at a time. I have a penchant for poetry and a love for all things vintage.",
  "Self-taught Chef and food blogger. Exploring flavors and experimenting with fusion recipes. In pursuit of the perfect dessert!",
  "Photographer with a love for capturing moments and telling stories through my lens. Exploring the outdoors and immortalizing landscapes.",
  "Environmental Scientist dedicated to sustainable living and conservation. Advocating for a greener, cleaner, and a more equitable planet.",
  "Fitness Trainer helping others achieve their wellness goals. Passionate about healthy living, mindfulness, and self-improvement.",
  "Musician and composer creating soulful melodies. Exploring rhythms and harmonies, and collaborating with artists around the world.",
  "Graphic Designer with a passion for creating visual stories. Interested in branding, illustration, and digital media.",
  "Digital Marketer with a knack for creating engaging content and driving traffic. SEO enthusiast and social media strategist."
]

post_bodies = [
    "Learning is the eye of the mind.",
    "A penny for your thoughts.",
    "Every cloud has a silver lining.",
    "The early bird catches the worm.",
    "When in Rome, do as the Romans do.",
    "Look before you leap.",
    "You can't make an omelet without breaking a few eggs.",
    "The pen is mightier than the sword.",
    "Actions speak louder than words.",
    "A watched pot never boils.",
    "The squeaky wheel gets the grease.",
    "You can lead a horse to water, but you can't make him drink.",
    "Every dog has his day.",
    "Let the cat out of the bag.",
    "A picture is worth a thousand words.",
    "There's no place like home.",
    "There's no such thing as a free lunch.",
    "The apple doesn't fall far from the tree.",
    "You can't judge a book by its cover.",
    "When the cat's away, the mice will play.",
    "A bird in the hand is worth two in the bush.",
    "You can't have your cake and eat it too.",
    "The grass is always greener on the other side.",
    "A leopard can't change its spots.",
    "The road to hell is paved with good intentions.",
    "Better late than never.",
    "All's well that ends well.",
    "Birds of a feather flock together.",
    "Cleanliness is next to godliness.",
    "A friend in need is a friend indeed.",
    "Don't bite the hand that feeds you.",
    "Don't count your chickens before they hatch.",
    "Don't put all your eggs in one basket.",
    "Every rose has its thorn.",
    "Familiarity breeds contempt.",
    "Fortune favors the bold.",
    "Good things come to those who wait.",
    "If it ain't broke, don't fix it.",
    "If you play with fire, you'll get burned.",
    "It's the early worm that gets caught.",
    "Keep your friends close and your enemies closer.",
    "Laughter is the best medicine.",
    "Love is blind.",
    "Out of sight, out of mind.",
    "Practice makes perfect.",
    "Seeing is believing.",
    "The enemy of my enemy is my friend.",
    "The only constant in life is change.",
    "The proof of the pudding is in the eating.",
    "Two heads are better than one.",
    "You are what you eat."
]




10.times do |i|
  user = User.create!(
    email: Faker::Internet.unique.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    gender: Faker::Gender.binary_type,
    birthday: Faker::Date.birthday(min_age: 18, max_age: 65), 
    password: SecureRandom.hex(8),
    bio: bios[i],
    workplace: Faker::Company.name,
    education: Faker::University.name,
    profile_picture: profile_pictures[i], 
    cover_photo: cover_photos[i],
    residence: Faker::Address.city
  )
end

  50.times do |index|
    Post.create!(
      body: post_bodies[index],
      author_id: rand(1..10), 
      feed_id: rand(1..10)
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
    profile_picture: "https://i.seadn.io/gcs/files/3085b3fc65f00b28699b43efb4434eec.png?auto=format&dpr=1&w=1000",
    cover_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ724NLQ-6MKmj--FPCEPZ9PCmaAvsSA0Pqow&usqp=CAU"
  )