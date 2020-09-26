import * as actionTypes from "./actionTypes";

export const user = (data) => {
  return {
    type: actionTypes.USER,
    payload: data,
  };
};

export const clear = () => {
  return {
    type: actionTypes.CLEAR,
  };
};
