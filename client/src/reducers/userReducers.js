import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT,  
    START_LOADING_USERS,
    FETCH_ALL_USERS,
    END_LOADING_USERS,
    UPDATE_USERS
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

export const userReducer = (state = { isLoading: true, users: []  }, action) => {

  switch (action.type) {

    case START_LOADING_USERS: 
      return { ...state, isLoading: true };
    case END_LOADING_USERS: 
      return { ...state, isLoading: false };
    case FETCH_ALL_USERS:
        return {
            ...state, 
            users: action.payload
        };
    case UPDATE_USERS:
        return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };

    /*case DELETE: 
        return { ...state, surveys: state.surveys = state.surveys.filter((survey) => survey._id !== action.payload) }; 
    case CREATE:
        return  { ...state, surveys: [ ...state.surveys, action.payload ] };
    case UPDATE:
        return { ...state, surveys: state.surveys.map((survey) => (survey._id === action.payload._id ? action.payload : survey)) };
    */
    default: 
        return state;
  }
}


  