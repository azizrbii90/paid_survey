import { START_LOADING_COMPLAINT, 
    END_LOADING_COMPLAINT,
    FETCH_ALL_COMPLAINT,
    DELETE_COMPLAINT,
    CREATE_COMPLAINT,
    UPDATE_COMPLAINT
  } from '../constants/complaintConstants';


export const complaintReducer = (state = { isLoading: true, complaints: []  }, action) => {

    switch (action.type) {
        case START_LOADING_COMPLAINT: 
            return { ...state, isLoading: true };
        case END_LOADING_COMPLAINT: 
            return { ...state, isLoading: false };
        case FETCH_ALL_COMPLAINT:
            return {
                ...state, 
                complaints: action.payload
            };
        case DELETE_COMPLAINT: 
            return { ...state, complaints: state.complaints = state.complaints.filter((complaint) => complaint._id !== action.payload) }; 
        case CREATE_COMPLAINT:
            return  { ...state, complaints: [ ...state.complaints, action.payload ] };
        default: 
            return state;
    }
}

