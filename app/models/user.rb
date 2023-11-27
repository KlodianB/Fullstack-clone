# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  gender          :string           not null
#  birthday        :date             not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  bio             :string
#  workplace       :string
#  education       :string
#  profile_picture :string
#  cover_photo     :string
#  residence       :string
#
class User < ApplicationRecord
  validates :email,
    presence: true,
    uniqueness: true,
    length: { in: 3..40 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, :gender, :birthday, presence: true 
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :created_posts, 
  foreign_key: :author_id,
  class_name: 'Post'

  has_many :posts, 
  foreign_key: :feed_id,
  class_name: 'Post'

  has_many :likes,
  class_name: :Like,
  dependent: :destroy

  has_many :comments

  has_secure_password

  before_validation :ensure_session_token
 # has_many :posts

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    if user&.authenticate(password)
      return user
    else
      return nil
    end
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.urlsafe_base64

      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
