import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT
} from "../constants/userConstants"


export const userLoginReducer = (state = {user: null, error:""}, action) => {

    switch (action.type) {
     
      case USER_LOGIN_REQUEST:
        return { loading: true, user: null, error:"" };
      case USER_LOGIN_SUCCESS:
        return { loading: false, user: action.payload, error:"" };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {user: null, error:""};
      default:
        return state;
    }
}

export const userRegisterReducer = (state = {userInfo: null, error: ""}, action) => {
    
    switch (action.type) {

      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload, error: "" };
      case USER_REGISTER_FAIL:
        return { loading: false, usrInfo: null, error: action.payload };
      default:
        return state;

    }
}




  