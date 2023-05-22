const barsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_BARS':
            console.log('BARS REDUCER: ', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default barsReducer;