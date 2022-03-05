import * as api from '../apis/userApis';

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT,
    USER_DETAILS_RESET
} from "../constants/userConstants"

export const register = (username, email, password, isVerified, type) => async (dispatch) => {

  try {
    
      dispatch({type : USER_REGISTER_REQUEST})

      const { data } = await api.register({username, email, password, isVerified, type})

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user })

      return data

  } catch(error) {
      dispatch({
          type: USER_REGISTER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
  }
}

export const login = (email, password) => async (dispatch) => {
    try {
      
      dispatch({ type: USER_LOGIN_REQUEST });
      
      const { data } = await api.login({ email, password })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
      localStorage.setItem("token", JSON.stringify(data.token));

      return data

    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};


export const getInfoFromToken = () => async (dispatch) => {
    try {
      
      dispatch({ type: USER_LOGIN_REQUEST });
      
      const { data } = await api.getInfoFromToken()
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
      return data

    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
};



  