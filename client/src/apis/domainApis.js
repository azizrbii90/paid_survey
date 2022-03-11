import axios from "axios"

const API = axios.create({ baseURL : 'http://localhost:5000/api/domains' })

export const listDomains = () => API.get(`/`);
export const deleteDomain = (id) => API.delete(`/${id}`);

