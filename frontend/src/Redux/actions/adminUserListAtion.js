import {
    FETCH_ADMIN_USER_LIST_REQUEST,
    FETCH_ADMIN_USER_LIST_SUCCESS,
    FETCH_ADMIN_USER_LIST_FAILURE,
} from "./types.js";
import axios from "axios";

export const fetchAdminUserListRequest = () => {
    return {
        type: FETCH_ADMIN_USER_LIST_REQUEST,
    };
};

export const fetchAdminUserListSuccess = (data) => {
    
    return {
        type: FETCH_ADMIN_USER_LIST_SUCCESS,
        payload: data,
    };
};

export const fetchAdminUserListFailure = (error) => {
    return {
        type: FETCH_ADMIN_USER_LIST_FAILURE,
        payload: error,
    };
};

export const fetchAdminUserList = () => {
    return async (dispatch) => {
        const adminToken = localStorage.getItem("admin_token");
       
        dispatch(fetchAdminUserListRequest());
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/admin/get_userlist/`,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

            dispatch(fetchAdminUserListSuccess(response.data));
        } catch (error) {
            dispatch(fetchAdminUserListFailure(error.message));
        }
    };
};
