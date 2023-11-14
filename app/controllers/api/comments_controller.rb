class Api::CommentsController < ApplicationController
  wrap_parameters include: Comment.attribute_names + ["userId", "postId"]
  before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @post = Post.find(params[:post_id])
        @comments = @post.comments
    end

    def create
        @post = Post.find(params[:post_id])
        @comment = Comment.new(comment_params)
        @comment.post = @post
        @comment.user = current_user
  
        if @comment.save
          render :show
        else
          render json: @comment.errors.full_messages, status: :unprocessable_entity
        end
    end
  
    def update
        @comment = Comment.find_by(id: params[:id])
        # @post = @comment.post 
  
        if @comment.update(comment_params)
          render :show
        else
          render json: @comment.errors.full_messages, status: :unprocessable_entity
        end
    end
  
    def destroy
        @comment = Comment.find_by(id: params[:id])
        if current_user == @comment.user
            @comment.destroy
            render json: { message: 'Comment deleted successfully' }
        else
            render json: {message: 'Not authorized to delete comment'}
        end
    end
  
    private
  
    def comment_params
        params.require(:comment).permit(:body, :post_id, :user_id)
    end
end
