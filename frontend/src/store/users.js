import csrfFetch from "./csrf";
import { setCurrentUser } from "./session";

export const SET_USER = 'users/setUser';
export const SET_USERS = 'users/setUsers'

const setUser = (data) => {
    return {
        type: SET_USER,
        data
    };
};

export const receiveUsers = (data) => {
    return {
        type: SET_USERS,
        data
    }
}

export const getUser = (userId) => {
    return (state) => {
        if (state.users) {
            return state.users[userId]
        } else {
            return null
        };
    };
};

export const getUsers = (state) => {
    if (state.users) {
        return Object.values(state.users)
    } else {
        return null
    };
};

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
    
    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data));
    } else {
        const error = await res.json();
        throw error;
    };
};

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users');

    const data = await res.json();
    dispatch(receiveUsers(data))
}

export const updateUser = ( userId, updatedUser) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
        const data = await res.json();
        debugger
        dispatch(setUser(data))
        dispatch(setCurrentUser(data.user))
    } else {
        const error = await res.json();
        throw error;
    };
};

const usersReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case SET_USER:
            newState[action.data.user.id] = action.data.user;
            return newState;
        case SET_USERS:
            return {...action.data.users}
        default:
            return state
    }
}

export default usersReducer;
