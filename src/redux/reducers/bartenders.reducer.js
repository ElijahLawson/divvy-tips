const bartendersReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_BARTENDERS':
            return action.payload;
        default: 
            return state;
    }
}

export default bartendersReducer;