import * as api from '../apis/orderApis';

import {
    START_LOADING_ORDER,
    END_LOADING_ORDER,
    FETCH_ALL_ORDER,
    DELETE_ORDER,
    CREATE_ORDER,
    UPDATE_ORDER
} from "../constants/orderConstants";


export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ORDER });
    const { data }  = await api.listOrders();
    dispatch({ type: FETCH_ALL_ORDER, payload: data.data});
    dispatch({ type: END_LOADING_ORDER });
    return data
  } catch (error) {
    console.log("error : ",error)
  }
}    

export const createOrder = (order, orderItems) => async (dispatch) => {
  try {
    order.orderItems = orderItems
      dispatch({ type: START_LOADING_ORDER })
      const { data } = await api.createOrder(order);
      dispatch({ type: CREATE_ORDER, payload: data.data})
      return data.data
  } catch (error) {
      console.log(error)
  }
}

export const updateOrder = (order) => async (dispatch) => {
  try {
      order.isDelivered = !order.isDelivered
      if(order.isDelivered)
        order.deliveredAt = Date()
      else 
        order.deliveredAt = null
      dispatch({ type: START_LOADING_ORDER })
      const { data } = await api.updateOrder(order);
      dispatch({ type: UPDATE_ORDER, payload: data})
      return data
  } catch (error) {
      console.log(error)
  }
}


export const deleteOrder = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteOrder(id);
    if(data._id) {
      dispatch({ type: DELETE_ORDER, payload: data._id})
    }
    return data
    } catch (error) {
    console.log("error : ",error)
  }
};

  