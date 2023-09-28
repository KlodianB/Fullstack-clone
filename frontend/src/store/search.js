import csrfFetch from "./csrf.js";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults';

export const receiveSearchResults = (searchResults) => {
    return {
        type: GET_SEARCH_RESULTS,
        searchResults 
    };
};

export const clearSearchResults = () => {
    return {
        type: CLEAR_SEARCH_RESULTS
    };
};

export const fetchSearchResults = (query) => async dispatch => {
    const res = await csrfFetch(`/api/users/search?query=${query}`)

    const data = await res.json();
    dispatch(receiveSearchResults(data));
};

const searchReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return {...action.searchResults.users}
        case CLEAR_SEARCH_RESULTS:
            return {}
        default:
            return state
    }
}

export default searchReducer;
