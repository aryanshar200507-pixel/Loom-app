import api from "../utils/axiosInstance";

export const userApi = {
	get: (userId) => api.get(`/users/${userId}`),
	update: (userId, data) => api.put(`/users/edit/${userId}`, data),
	delete: (userId) => api.delete(`/users/delete/${userId}`),
};
