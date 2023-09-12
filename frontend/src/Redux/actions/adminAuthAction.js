import axios from 'axios';
import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGIN_CLEAR_ERROR,
    ADMIN_LOGOUT,
} from './types';


export const checkAdminAuthentication = () => async (dispatch) => {
    const adminToken = localStorage.getItem('admin_token');
    console.log(adminToken);
    if (adminToken) {
        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: {
                token: adminToken,
            },
        });
    }
};

export const adminLogin = (email, password) => async (dispatch) => {
    console.log("HERE");
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({email,password});

    try {
        const res =  await axios.post(`${process.env.REACT_APP_API_URL}/admin/admin-login/`,
        body,
        config);

        console.log(res.data.token);
       
        localStorage.setItem('admin_token', res.data.token);


        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch({
            type: ADMIN_LOGIN_CLEAR_ERROR,
        })

    } catch (err) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload: err.response.data,
        });

    }
};

export const adminLogout = () => (dispatch) => {
    localStorage.removeItem('admin_token');
    dispatch({
        type: ADMIN_LOGOUT,
    });
};