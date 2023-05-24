const userTipsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_USER_TIPS':
            return action.payload;
        default:
            return state;
    }
}

export default userTipsReducer;