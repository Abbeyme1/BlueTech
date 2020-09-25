import * as actionTypes from "./actionTypes";

export const user = (data) => {
  return {
    type: actionTypes.USER,
    payload: data,
  };
};
