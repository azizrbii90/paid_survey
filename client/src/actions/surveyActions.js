import * as api from '../apis/surveyApis';

import {
    START_LOADING,
    END_LOADING,
    FETCH_ALL,
    DELETE,
    SURVEY_LIST_SUCCESS,
    SURVEY_LIST_REQUEST,
    SURVEY_LIST_FAIL,
    SURVEY_DELETE_REQUEST,
    SURVEY_DELETE_SUCCESS,
    SURVEY_DELETE_FAIL
} from "../constants/surveyConstants";

export const listSurveys = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data }  = await api.listSurveys();
    console.log("FETCH ALL : ", data)
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
  