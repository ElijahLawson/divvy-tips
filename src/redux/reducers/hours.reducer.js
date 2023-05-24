const hoursReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFT_HOURS':
            return action.payload;
        default:
            return state;
    }
}

export default hoursReducer;