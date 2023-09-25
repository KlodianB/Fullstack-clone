json.post do
  json.extract! @post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
end