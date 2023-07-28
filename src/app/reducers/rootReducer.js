import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./userReducer";
import { snackBar } from "./snackBarReducer";

export default combineReducers({
  user,
  snackBar,
});
