class Api::LikesController < ApplicationController
    wrap_parameters include: Like.attribute_names + ["userId", "likeableId"]
    
    def index
        @likes = Like.all
        render :index
    end

    def create
        @like = Like.new(like_params)

        if @like.save
            render json: { message: 'success' }
        else
            render json: { errors: ['could not create like'] }, 
            status: :unauthorized
        end 
    end
    
    def destroy
        @like = Like.find_by(id: params[:id])

        @like.destroy
    end

    private

    def like_params
        params.require[:like].permit(:user_id, :likeable_id)
    end
end