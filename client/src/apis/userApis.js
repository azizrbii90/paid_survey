import axios from "axios"

let API = axios.create({ baseURL : 'http://localhost:5000/api/users' })
let token = localStorage.getItem('token')
if(token)
  API.defaults.headers.common['Authorization'] = 'Bearer '+ token

const config = {
  headers: {
      'Content-Type': 'application/json'
  }
}

export const register = (newUser) => API.post(`/register`,newUser,config);
export const login = (user) => API.post(`/login`,user,config);
export const recoverPasswordRequest = (email) => API.get(`/recover-password-request/${email}`);
export const recoverPassword = (email, password, confirmPassword, cookie_email) => API.put(`/recover-password/${email}`, {email, password, confirmPassword, cookie_email});
export const getInfoFromToken = () => API.get(`/getInfoFromToken`);
export const updatePassword = (id, currentPassword, newPassword) => API.put(`/${id}/new-password`, {currentPassword, newPassword})

// specific for admin 

export const listUsers = () => API.get(`/get`);
export const updateUser = (user) => API.put(`/update/${user._id}`, user);
export const deleteUser = (id) => API.delete(`/${id}`);





