const shiftsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFTS':
            console.log('SHIFTS SAGA: ', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default shiftsReducer;