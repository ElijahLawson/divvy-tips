const shiftDrawersReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFT_DRAWERS':
            console.log('LETS GOOOOOOO', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default shiftDrawersReducer;