import api from "../utils/axiosInstance";

export const authApi = {

  login: (data) => api.post("/auth/login", data),

  register: (data) => api.post("/auth/register", data),

  forgot: (email) =>
    api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`),

  reset: (token, password) =>
    api.post(`/auth/reset-password?token=${token}&password=${encodeURIComponent(password)}`),

};