import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { userReducer } from "./useReducer";

const rootReducer = combineReducers({
  user: userReducer,
  darkTheme: themeReducer,
});

export default rootReducer;
