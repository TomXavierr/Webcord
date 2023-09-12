import {
    FETCH_ADMIN_USER_LIST_REQUEST,
    FETCH_ADMIN_USER_LIST_SUCCESS,
    FETCH_ADMIN_USER_LIST_FAILURE,
  } from '../actions/types';
  
  const initialState = {
    adminUserList: [],
    loading: false,
    error: null,
  };
  
  const adminUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADMIN_USER_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ADMIN_USER_LIST_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          adminUserList: action.payload,
        };
      case FETCH_ADMIN_USER_LIST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adminUserReducer;