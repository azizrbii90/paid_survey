import axios from "axios"

const API = axios.create({ baseURL : 'http://localhost:5000/api/gifts' })

export const listGifts = () => API.get(`/`);
export const createGift = (newGift) => API.post('/', newGift, { headers: { 'Content-Type': 'multipart/form-data' }});
export const deleteGift = (id) => API.delete(`/${id}`);
export const updateGift = (gift) => API.put(`/${gift._id}`, gift);

