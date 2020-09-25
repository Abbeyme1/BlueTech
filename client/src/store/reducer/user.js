import * as actionTypes from "../action/actionTypes";

const initalState = null;

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.USER:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;