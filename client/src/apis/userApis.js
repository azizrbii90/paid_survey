import axios from "axios"

const API = axios.create({ baseURL : 'http://localhost:5000/api/users' })

const config = {
  headers: {
      'Content-Type': 'application/json'
  }
}

export const register = (newUser) => API.post(`/register`,newUser,config);
export const login = (user) => API.post(`/login`,user,config);
export const recoverPasswordRequest = (email) => API.get(`/recover-password-request/${email}`);
export const recoverPassword = (email, password, confirmPassword, cookie_email) => API.put(`/recover-password/${email}`, {email, password, confirmPassword, cookie_email});
