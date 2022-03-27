import * as api from '../apis/complaintApis';

import {
    START_LOADING_COMPLAINT,
    END_LOADING_COMPLAINT,
    FETCH_ALL_COMPLAINT,
    DELETE_COMPLAINT,
    CREATE_COMPLAINT,
    UPDATE_COMPLAINT
} from "../constants/complaintConstants";


export const listComplaints = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COMPLAINT });
    const { data }  = await api.listComplaints();
    dispatch({ type: FETCH_ALL_COMPLAINT, payload: data.data});
    dispatch({ type: END_LOADING_COMPLAINT });
    return data
  } catch (error) {
    console.log("error : ",error)
  }
}    

export const createComplaint = (complaint) => async (dispatch) => {
  try {
      dispatch({ type: START_LOADING_COMPLAINT })
      const { data } = await api.createComplaint(complaint);
      dispatch({ type: CREATE_COMPLAINT, payload: data.data})
      return data.data
  } catch (error) {
      console.log(error)
  }
}


export const deleteComplaint = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteComplaint(id);
    if(data._id) {
      dispatch({ type: DELETE_COMPLAINT, payload: data._id})
    }
    return data
    } catch (error) {
    console.log("error : ",error)
  }
};

  