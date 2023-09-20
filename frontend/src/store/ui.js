const CHANGE_MODAL_DISPLAY = 'changeModalDisplay'

export const setModalDisplay = (toggle) => {
    return {
        type: CHANGE_MODAL_DISPLAY,
        toggle
    }
};

const initialState = {
    showModalDisplay: false
}

export const getModalDisplay = state => {
    return state.ui.showModalDisplay
}

const uiReducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case CHANGE_MODAL_DISPLAY:
            newState.showModalDisplay = action.toggle
            return newState
            break;
        default:
            return state
            break;
    }
}

export default uiReducer;