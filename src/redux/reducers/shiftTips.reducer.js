const shiftTipsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFT_TIPS':
            return action.payload;
        default:
            return state;
    }
}

export default shiftTipsReducer;