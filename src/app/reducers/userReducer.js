import actionTypes from "../utils/actionTypes";

const initialState = {};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return Object.keys(state).length === 0 ? false : state;
  }
};
