import { START_LOADING_DOMAIN, 
    END_LOADING_DOMAIN,
    FETCH_ALL_DOMAIN,
    DELETE_DOMAIN
  } from '../constants/domainConstants';


export const domainReducer = (state = { isLoading: true, domains: []  }, action) => {
switch (action.type) {

case START_LOADING_DOMAIN: 
 return { ...state, isLoading: true };
case END_LOADING_DOMAIN: 
 return { ...state, isLoading: false };
case FETCH_ALL_DOMAIN:
   return {
       ...state, 
       domains: action.payload
   };
case DELETE_DOMAIN: 
   return { ...state, domains: state.domains = state.domains.filter((domain) => domain._id !== action.payload) }; 
default: 
   return state;
 }
}

