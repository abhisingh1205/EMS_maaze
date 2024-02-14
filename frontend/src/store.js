import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { messageReducer } from "./reducers/messageReducers";
import { getCategoriesListReducer } from "./reducers/categroyReducers";
import {
  fileUploadReducer,
  taskListReducer,
} from "./reducers/employeeReducers";

const reducer = combineReducers({
  userList: userLoginReducer,
  messageDetails: messageReducer,
  categoryList: getCategoriesListReducer,
  registerDetails: userRegisterReducer,
  fileUploadDetails: fileUploadReducer,
  tasksList: taskListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
