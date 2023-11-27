@likes.each do |like|
    json.like do
        json.extract! like, like.id, like.likeable_id, like.likeable_type
    end
end