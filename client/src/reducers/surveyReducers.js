import { START_LOADING, 
         END_LOADING,
         FETCH_ALL,
         DELETE
       } from '../constants/surveyConstants';


export const surveyReducer = (state = { isLoading: true, surveys: []  }, action) => {

  switch (action.type) {

    case START_LOADING: 
      return { ...state, isLoading: true };
    case END_LOADING: 
      return { ...state, isLoading: false };
    case FETCH_ALL:
        return {
            ...state, 
            surveys: action.payload
        };
    case DELETE: 
        return { ...state, surveys: state.surveys = state.surveys.filter((survey) => survey._id !== action.payload) }; 
    default: 
        return state;
  }
}

/*
export const surveyDeleteReducer = (state = {}, action) => {
  
  switch (action.type) {
  
    case SURVEY_DELETE_REQUEST:
      return { loading: true };
    case SURVEY_DELETE_SUCCESS:
      console.log("delete ", surveyListReducer.state)
      return { loading: false, success: true };
    case SURVEY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  
  }
};*/
