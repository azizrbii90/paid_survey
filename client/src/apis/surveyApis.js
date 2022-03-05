import axios from "axios"

const API = axios.create({ baseURL : 'http://localhost:5000/api/surveys' })

export const listSurveys = () => API.get(`/`);
export const deleteSurvey = (id) => API.delete(`/${id}`);

