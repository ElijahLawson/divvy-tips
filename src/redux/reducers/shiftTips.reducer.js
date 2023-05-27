const shiftTipsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SHIFT_TIPS_MINIMIZED':
            action.payload = action.payload.map(shift_tips => (({drawer_id, drawer_name, total_tips}) => ({drawer_id, drawer_name, total_tips}))(shift_tips))
            return action.payload;
        case 'SET_SHIFT_TIPS':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default shiftTipsReducer;