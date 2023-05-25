const barsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_BARS':
            return action.payload;
        default:
            return state;
    }
};

export default barsReducer;