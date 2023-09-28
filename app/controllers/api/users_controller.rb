class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastName', 'profilePicture', 'coverPhoto']

  def index 
    @users = User.all 
    render :index
  end
  
  def show
    @user = User.find_by(id: params[:id])

    if @user 
      render :show
    else 
      render json: { errors: ['User not found'] }, status: 404
    end
  end

  def search
    query = params[:query]

    @users = User.where('first_name ILIKE ?', "%#{query}%")
    render :search
  end

  def update
      @user = User.find_by(id: params[:id])

      if @user.update(user_params)
        render :show
      else 
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
  end


  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])

    if @user 
      @user.destroy
    else
      render json: { errors: ['User not found'] }, status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :birthday, :gender, :bio, :workplace, :education, :profile_picture, :cover_photo, :residence)
  end
end
