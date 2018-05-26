export default (state = false,actions) => {
    switch(actions.type) {
        case 'on': {
            return actions.value;
        };
        case 'off': {
            return actions.value;
        }
        default:return state;
    }
}