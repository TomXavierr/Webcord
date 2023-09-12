import { combineReducers } from "redux";

import authReducer from "./authReducer";
import adminAuthReducer from "./adminAuthReducer";
import adminUserReducer from "./adminUserListReducer";

export default combineReducers({
    auth: authReducer,
    adminAuth: adminAuthReducer,
    adminUserList: adminUserReducer,
});