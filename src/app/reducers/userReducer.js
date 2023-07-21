import actionTypes from "../utils/actionTypes";

const initialState = [];

export const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_USERS:
      return state;

    default:
      return state;
  }
};
