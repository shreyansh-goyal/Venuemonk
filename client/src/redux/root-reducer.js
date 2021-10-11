import { useReducer } from "react";
import { combineReducers } from "redux";
import AuthReducer from "./auth/auth.reducer";
import UsersReducer from "./users/users.reducer";

const rootReducer = combineReducers({
    auth:AuthReducer,
    users:UsersReducer
});

export default rootReducer;