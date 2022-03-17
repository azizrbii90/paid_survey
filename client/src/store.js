import { createStore, combineReducers, applyMiddleware } from 'redux';  
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; 

import {
    //surveyListReducer,
    //surveyDeleteReducer
    surveyReducer
    } from "./reducers/surveyReducers";

import {
    domainReducer
    } from "./reducers/domainReducers";

import {
    giftReducer
} from "./reducers/giftReducers";
    
import {
    userLoginReducer,
    userRegisterReducer,
    userReducer
    } from "./reducers/userReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    surveyReducer: surveyReducer,
    domainReducer: domainReducer,
    userReducer: userReducer,
    giftReducer: giftReducer
    //surveyList: surveyListReducer,
    //surveyDelete: surveyDeleteReducer
}); 

const initialState = {
};

const middleware = [thunk]; 

const store = createStore(
    reducer,  
    initialState,  
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;