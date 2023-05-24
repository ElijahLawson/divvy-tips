const currentShift = (state=[], action) => {
    switch (action.type) {
        case 'SET_CURRENT_SHIFT':
            return action.payload;
        default:
            return state;
    }
}

export default currentShift;