import csrfFetch from "./csrf";
import { SET_USER } from "./users";

const RECEIVE_POST = "/posts/receivePost";
const RECEIVE_POSTS = "/posts/receivePosts";
const REMOVE_POST = "/posts/removePost";

export const receivePost = (data) => {
    return {
        type: RECEIVE_POST,
        data
    };
};

export const receivePosts = (data) => {
    return {
        type: RECEIVE_POSTS,
        data
    };
};

const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    };
};

export const getPost = (postId) => {
    return (state) => {
        if (state.posts[postId]) {
            return state.posts[postId]
        } else {
            return null
        };
    };
};

export const getPosts = (state) => {
    if (state.posts) {
        return Object.values(state.posts)
    } else {
        return []
    };
};

export const createPost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify(post)
    });
    const data = await res.json();
    dispatch(receivePost(data));
};

export const updatePost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        body: JSON.stringify(post)
    });

    const data = await res.json();
    dispatch(receivePost(data));
};

export const deletePost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(removePost(postId))
    };
};

const postsReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_POST:
            newState[action.data.post.id] = action.data.post;
            return newState;
            break;
        case RECEIVE_POSTS:
            return {...newState, ...action.data.posts}
            break;
        case REMOVE_POST:
            delete newState[action.postId]
            return newState
            break;
        case SET_USER:
            return {...action.data.posts }
            break;
        default:
            return state
            break;
    }; 
};

export default postsReducer