import * as actionTypes from "../action/actionTypes";

const initalState = null;

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.USER:
      return action.payload;

    case actionTypes.CLEAR:
      return null;

    case actionTypes.UPDATE:
      return {
        ...state,
        points: action.payload.points,
      };

    default:
      return state;
  }
};

export default reducer;
