class Api::PostsController < ApplicationController
  wrap_parameters include: Post.attribute_names + ["authorId", "feedId", "photo"]
  def index
    @posts = Posts.all
    render :index
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else 
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find_by(id: params[:id])

    if @post.update(post_params)
      render :show
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])

    @post.destroy
  end

  private

  def post_params

    params.require(:post).permit(:body, :author_id, :feed_id, :photo)
  end
end
