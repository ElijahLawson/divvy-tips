const shiftTipsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFT_TIPS':
            return [...state, action.payload];
        default:
            return state;
    }
}