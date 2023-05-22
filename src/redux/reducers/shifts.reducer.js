const shiftsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFTS':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default shiftsReducer;