import csrfFetch from "./csrf";
import { RECEIVE_POST, RECEIVE_POSTS } from "./posts";
import { SET_USER } from "./users";

const RECEIVE_COMMENT =  "/comments/receiveComment";
const RECEIVE_COMMENTS = "/comments/receiveComments";
const REMOVE_COMMENT = "/comments/removeComment";

export const receiveComment = (data) => {
    return {
        type: RECEIVE_COMMENT,
        data
    };
};

export const receiveComments = (data) => {
    return {
        type: RECEIVE_COMMENTS,
        data
    };
};

const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    };
};

export const getComment = (commentId) => {
    return (state) => {
        if (state.comments[commentId]) {
            return state.comments[commentId]
        } else {
            return null
        }
    }
}

export const getComments = (state) => {
        if (state.comments) {
            return Object.values(state.comments)
        } else {
            return []
        };
};

export const fetchAllComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');
    const data = await res.json();
    dispatch(receiveComments(data));
};

export const createComment = (comment) => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    dispatch(receiveComment(data));
};

export const updateComment = (comment, commentId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify(comment),
    });
    const data = await res.json();
    dispatch(receiveComment(data));
};

export const deleteComment = (commentId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(removeComment(commentId))
    };
};

const commentsReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_COMMENT:
            newState[action.data.comment.id] = action.data.comment;
            return newState;
        case RECEIVE_COMMENTS:
            return {...newState, ...action.data.comments}
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        case SET_USER:
            if (action.data.posts) {
                Object.values(action.data.posts).forEach((post) => {
                    post.comments.forEach((comment) => {
                        newState[comment.id] = comment
                    })
                })
            }
            return newState
        case RECEIVE_POSTS:
            Object.values(action.data.posts).forEach((post) => {
                post.comments.forEach((comment) => {
                    newState[comment.id] = comment
                })
            })
            return newState
        default:
            return state;
    }
};

export default commentsReducer;