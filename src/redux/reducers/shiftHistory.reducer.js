const shiftHistoryReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFT_HISTORY':
            return action.payload;
        default:
            return state;
    }
}

export default shiftHistoryReducer;