import { combineReducers } from "redux"
import AuthReducer from "./auth";

export default combineReducers({
    Auth : AuthReducer
})