import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    CLEAR_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
} from "./types";

export const load_user = () => async (dispatch) => {
    const token = localStorage.getItem("access");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/account/user-details/`,
            config
        );

        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    const access = localStorage.getItem("access");

    if (access) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        const body = JSON.stringify({ token: localStorage.getItem("access") });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/token/verify/`,
                body,
                config
            );

            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
                await dispatch(load_user());
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                const refreshConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                };
                const refreshBody = JSON.stringify({
                    refresh: localStorage.getItem("refresh"),
                });

                try {
                    const refreshRes = await axios.post(
                        `${process.env.REACT_APP_API_URL}/api/token/refresh/`,
                        refreshBody,
                        refreshConfig
                    );

                    localStorage.setItem("access", refreshRes.data.access);

                    const verifyRes = await axios.post(
                        `${process.env.REACT_APP_API_URL}/api/token/verify/`,
                        JSON.stringify({ token: refreshRes.data.access }),
                        config
                    );

                    if (verifyRes.data.code !== "token_not_valid") {
                        dispatch({
                            type: AUTHENTICATED_SUCCESS,
                        });
                        await dispatch(load_user());
                        return;
                    }
                } catch (refreshErr) {
                    dispatch({
                        type: AUTHENTICATED_FAIL,
                    });
                    return;
                }
            }
            dispatch({
                type: AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
};

//--------------------------------LOGIN ACTION---------------------------------------------------------------------------------------------------------------
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/token/create/`,
            body,
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        await dispatch(load_user());

        dispatch({
            type: CLEAR_ERROR,
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data,
        });
    }
};

//--------------------------------LOGIN ACTION---------------------------------------------------------------------------------------------------------------
export const signup =
    (email, username, display_name, password) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            email,
            username,
            display_name,
            password,
        });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/users/`,
                body,
                config
            );

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });

            dispatch({
                type: CLEAR_ERROR,
            });
        } catch (err) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: err.response.data,
            });
            // }
        }
    };

export const activate = (uid, token) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
            body,
            config
        );

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        });
    }
};

//--------------------------------LOGOUT ACTION---------------------------------------------------------------------------------------------------------------

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
