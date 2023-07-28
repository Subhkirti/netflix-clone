import actionTypes from "../utils/actionTypes";

const initialState = {
  snackbarMessage: "",
  showSnackBar: false,
};

export function snackBar(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SNACKBAR_OPEN:
      return {
        ...state,
        snackbarMessage: action.message,
        showSnackBar: true,
      };
    case actionTypes.SNACKBAR_CLOSE:
      return {
        ...state,
        showSnackBar: false,
      };

    default:
      return state;
  }
}
