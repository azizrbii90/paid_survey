import axios from "axios"

const API = axios.create({ baseURL : 'http://localhost:5000/api/complains' })

export const listComplaints = () => API.get(`/`);
export const createComplaint = (newComplaint) => API.post('/', newComplaint);
export const deleteComplaint = (id) => API.delete(`/${id}`);

