import axios from "axios"

const API = axios.create({ baseURL : 'http://localhost:5000/api/orders' })

export const listOrders = () => API.get(`/`);
export const createOrder = (newOrder) => API.post('/', newOrder);
export const deleteOrder = (id) => API.delete(`/${id}`);
export const updateOrder = (order) => API.put(`/${order._id}`, order);

