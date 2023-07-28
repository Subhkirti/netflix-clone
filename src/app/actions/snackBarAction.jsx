import actionTypes from "../utils/actionTypes";

export const setSnackbarMessage = (message) => {
  return {
    type: actionTypes.SNACKBAR_OPEN,
    message: message,
  };
};
export const removeSnackbarMessage = () => {
  return {
    type: actionTypes.SNACKBAR_CLOSE,
  };
};
