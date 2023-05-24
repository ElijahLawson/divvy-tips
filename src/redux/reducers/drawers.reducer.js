const drawersReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_DRAWERS':
            return action.payload;
        default:
            return state;
    }
}

export default drawersReducer;