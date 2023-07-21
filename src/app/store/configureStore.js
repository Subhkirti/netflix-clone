import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
import logger from "redux-logger";

const middleWares = [];
if (process?.env?.NODE_ENV !== "production") {
  middleWares.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: () => middleWares,
});

export default store;
