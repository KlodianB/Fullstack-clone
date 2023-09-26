class Api::PostsController < ApplicationController
  wrap_parameters include: Post.attribute_names + ["authorId", "feedId"]
  def index
    @posts = Posts.all
    render :index
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
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
    params.require(:post).permit(:body, :author_id, :feed_id)
  end
end
