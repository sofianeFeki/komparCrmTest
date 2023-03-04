export const drawerReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_OPEN':
      return action.payload;
    default:
      return state;
  }
};
