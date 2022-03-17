import { START_LOADING_GIFT, 
    END_LOADING_GIFT,
    FETCH_ALL_GIFT,
    DELETE_GIFT,
    CREATE_GIFT,
    UPDATE_GIFT
  } from '../constants/giftConstants';


export const giftReducer = (state = { isLoading: true, gifts: []  }, action) => {

    switch (action.type) {
        case START_LOADING_GIFT: 
            return { ...state, isLoading: true };
        case END_LOADING_GIFT: 
            return { ...state, isLoading: false };
        case FETCH_ALL_GIFT:
            return {
                ...state, 
                gifts: action.payload
            };
        case DELETE_GIFT: 
            return { ...state, gifts: state.gifts = state.gifts.filter((gift) => gift._id !== action.payload) }; 
        case CREATE_GIFT:
            return  { ...state, gifts: [ ...state.gifts, action.payload ] };
        case UPDATE_GIFT:
            return { ...state, gifts: state.gifts.map((gift) => (gift._id === action.payload._id ? action.payload : gift)) };
        default: 
            return state;
    }
}

