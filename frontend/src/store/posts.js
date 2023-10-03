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

a