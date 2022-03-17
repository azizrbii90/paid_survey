import * as api from '../apis/giftApis';

import {
    START_LOADING_GIFT,
    END_LOADING_GIFT,
    FETCH_ALL_GIFT,
    DELETE_GIFT,
    CREATE_GIFT,
    UPDATE_GIFT
} from "../constants/giftConstants";


export const listGifts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_GIFT });
    const { data }  = await api.listGifts();
    dispatch({ type: FETCH_ALL_GIFT, payload: data.data});
    dispatch({ type: END_LOADING_GIFT });
    return data
  } catch (error) {
    console.log("error : ",error)
  }
}    

export const createGift = (gift) => async (dispatch) => {
  try {
      dispatch({ type: START_LOADING_GIFT })
      const { data } = await api.createGift(gift);
      dispatch({ type: CREATE_GIFT, payload: data.data})
      return data.data
  } catch (error) {
      console.log(error)
  }
}

export const updateGift = (gift) => async (dispatch) => {
  try {
      dispatch({ type: START_LOADING_GIFT })
      const { data } = await api.updateGift(gift);
      dispatch({ type: UPDATE_GIFT, payload: data})
      return data
  } catch (error) {
      console.log(error)
  }
}


export const deleteGift = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteGift(id);
    if(data._id) {
      dispatch({ type: DELETE_GIFT, payload: data._id})
    }
    return data
    } catch (error) {
    console.log("error : ",error)
  }
};

  