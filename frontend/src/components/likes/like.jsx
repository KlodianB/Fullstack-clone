import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, deleteLike } from './store/likes';

const LikeButton = ({ likeableType, likeableId }) => {
    const dispatch = useDispatch();
    const likes = useSelector(state => Object.values(state.likes));
    const [liked, setLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);

    useEffect(() => {
        const like = likes.find(like => like.likeableId === likeableId && like.likeableType === likeableType);
        if (like) {
            setLiked(true);
            setLikeId(like.id);
        } else {
            setLiked(false);
            setLikeId(null);
        }
    }, [likes, likeableId, likeableType]);

    const handleLike = () => {
        if (!liked) {
            dispatch(createLike({
                likeableType,
                likeableId
            }));
        } else {
            dispatch(deleteLike({
                id: likeId
            }));
        }
    };

    return (
        <button onClick={handleLike}>
            {liked ? 'Unlike' : 'Like'}
        </button>
    );
};

export default LikeButton;
