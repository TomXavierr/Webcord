import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    CLEAR_ERROR,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
} from "../actions/types";

const initialState = {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: null,
    user: null,
    error: null,
    signupError: null,
    isAccountCreated: false,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("access", payload.access);
            localStorage.setItem("refresh", payload.refresh);

            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isAccountCreated: true,
                signupError: null,
            };

        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
            };


        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            };

        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            };
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem("access", payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            };

        case GOOGLE_AUTH_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case SIGNUP_FAIL:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                signupError: action.payload,
                isAccountCreated: false,
            };

        case LOGOUT:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
                signupError: null,
            };

        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default authReducer;
