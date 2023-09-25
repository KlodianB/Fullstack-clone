import csrfFetch from "./csrf";

const SET_USER = 'users/setUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    };
};

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
    
    if (res.ok) {
        const {user} = await res.json();
        dispatch(setUser(user));
    } else {
        const error = await res.json();
        throw error;
    };
};

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
        dispatch(setUser(data.user))
    } else {
        const error = await res.json();
        throw error;
    };
};

const usersReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case SET_USER:
            newState[action.user.id] = action.user;
            return newState;
        default:
            return state
    }
}

export default usersReducer;
