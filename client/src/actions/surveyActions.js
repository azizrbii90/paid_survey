import * as api from '../apis/surveyApis';

import {
    START_LOADING,
    END_LOADING,
    FETCH_ALL,
    DELETE,
    CREATE, 
    UPDATE
} from "../constants/surveyConstants";

export const listSurveys = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data }  = await api.listSurveys();
    dispatch({ type: FETCH_ALL, payload: data});
    dispatch({ type: END_LOADING });
    return data
  } catch (error) {
    console.log("error : ",error)
  }
}         



  export const deleteSurvey = (id) => async (dispatch) => {
    try {
      const { data } = await api.deleteSurvey(id);
      if(data._id) {
        dispatch({ type: DELETE, payload: data._id})
      }
      return data
      } catch (error) {
      console.log("error : ",error)
    }
  };

  export const createSurvey = (survey) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createSurvey(survey);
        dispatch({ type: CREATE, payload: data.data})
        return data.data
    } catch (error) {
        console.log(error)
    }
 }

 export const updateSurvey = (survey) => async (dispatch) => {
  try {
      dispatch({ type: START_LOADING })
      const { data } = await api.updateSurvey(survey);
      dispatch({ type: UPDATE, payload: data.data})
      return data.data
  } catch (error) {
      console.log(error)
  }
}
  