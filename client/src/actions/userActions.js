import * as api from '../apis/userApis';

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT,
    START_LOADING_USERS,
    FETCH_ALL_USERS,
    END_LOADING_USERS,
    UPDATE_USERS,
    DELETE_USERS,
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
      localStorage.setItem("wallet", JSON.stringify(data.user.wallet));
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

export const modifyProfile = (user) => async (dispatch) => {
  try {   
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await api.updateUser(user);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      return data
  } catch (error) {
      console.log(error)
  }
}

export const updatePassword = (id, currentPassword, newPassword) => async (dispatch) => {
  try {   
      //dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await api.updatePassword(id, currentPassword, newPassword);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      return data
  } catch (error) {
      console.log(error.response.data)
      return error
  }
}

export const getInfoFromToken = () => async (dispatch) => {
    try {
      
      dispatch({ type: USER_LOGIN_REQUEST });
      
      const { data } = await api.getInfoFromToken()
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
      localStorage.setItem("wallet", JSON.stringify(data.user.wallet));

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

export const logout = (navigate) => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("wallet");
    localStorage.removeItem("allOrders");
    navigate('/')
    dispatch({ type: USER_LOGOUT });
};

// specific for admin 

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS });
    const { data }  = await api.listUsers();
    dispatch({ type: FETCH_ALL_USERS, payload: data.data});
    dispatch({ type: END_LOADING_USERS });
    return data.data
  } catch (error) {
    console.log("error : ",error)
  }
}  

export const updateUser = (user, type) => async (dispatch) => {
  try {
      if(type === 'isBlocked')
        user.isBlocked = !user.isBlocked
      if(type === 'isVerified') 
        user.isVerified = ! user.isVerified
        
      dispatch({ type: START_LOADING_USERS })
      const { data } = await api.updateUser(user);
      dispatch({ type: UPDATE_USERS, payload: data})
      return data.data
  } catch (error) {
      console.log(error)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(id);
    if(data._id) {
      dispatch({ type: DELETE_USERS, payload: data._id})
    }
    return data
    } catch (error) {
    console.log("error : ",error)
  }
};


  