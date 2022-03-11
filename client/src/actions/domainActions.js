import * as api from '../apis/domainApis';

import {
    START_LOADING_DOMAIN,
    END_LOADING_DOMAIN,
    FETCH_ALL_DOMAIN,
    DELETE_DOMAIN,
} from "../constants/domainConstants";

export const listDomains = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DOMAIN });
    const { data }  = await api.listDomains();
    dispatch({ type: FETCH_ALL_DOMAIN, payload: data.data});
    dispatch({ type: END_LOADING_DOMAIN });
    return data
  } catch (error) {
    console.log("error : ",error)
  }
}         



  export const deleteDomain = (id) => async (dispatch) => {
    try {
      const { data } = await api.deleteDomain(id);
      if(data._id) {
        dispatch({ type: DELETE_DOMAIN, payload: data._id})
      }
      return data
      } catch (error) {
      console.log("error : ",error)
    }
  };
  