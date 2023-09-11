import { combineReducers } from "redux";

import authReducer from "./authReducer";
import adminAuthReducer from "./adminAuthReducer";

export default combineReducers({
    auth: authReducer,
    adminAuth: adminAuthReducer
});