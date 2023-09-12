import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_CLEAR_ERROR,
    ADMIN_LOGOUT,
} from '../actions/types';

const initialState = {
    admin_token: null,
    isAuthenticated: null,
    isAdmin: null,
    user: null,
    admin_login_error: null,
};

const adminAuthReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADMIN_LOGIN_SUCCESS:
            localStorage.setItem('admin_token', payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: true,
                admin_token: payload.token, 
                
            };

        case ADMIN_LOGIN_FAIL:
            localStorage.removeItem('admin_token');
            return {
                ...state,
                admin_token: null,
                isAuthenticated: false,
                isAdmin: false,
                user: null,
                admin_login_error: payload,
            };

        case ADMIN_LOGIN_CLEAR_ERROR:
            return {
                ...state,
                admin_login_error: null,
            };
     
        case ADMIN_LOGOUT:
            localStorage.removeItem('admin_token');
            return {
                ...state,
                admin_token: null,
                isAuthenticated: false,
                isAdmin: false,
                user: null,
                admin_login_error: null,
            };

        default:
            return state;
    }
};

export default adminAuthReducer;