const bartendersReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_BARTENDERS':
            return action.payload;
        case 'GET_BARTENDERS':
            console.log(state);
            return state
        default: 
            return state;
    }
}

export default bartendersReducer;