json.comments do
    @comments.each do |comment|
      json.set! comment.id do
        json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
      end
    end
  end