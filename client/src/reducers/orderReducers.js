import { START_LOADING_ORDER, 
    END_LOADING_ORDER,
    FETCH_ALL_ORDER,
    DELETE_ORDER,
    CREATE_ORDER,
    UPDATE_ORDER
  } from '../constants/orderConstants';


export const orderReducer = (state = { isLoading: true, orders: []  }, action) => {

    switch (action.type) {
        case START_LOADING_ORDER: 
            return { ...state, isLoading: true };
        case END_LOADING_ORDER: 
            return { ...state, isLoading: false };
        case FETCH_ALL_ORDER:
            return {
                ...state, 
                orders: action.payload
            };
        case DELETE_ORDER: 
            return { ...state, orders: state.orders = state.orders.filter((order) => order._id !== action.payload) }; 
        case CREATE_ORDER:
            return  { ...state, orders: [ ...state.orders, action.payload ] };
        case UPDATE_ORDER:
            return { ...state, orders: state.orders.map((order) => (order._id === action.payload._id ? action.payload : order)) };
        default: 
            return state;
    }
}

