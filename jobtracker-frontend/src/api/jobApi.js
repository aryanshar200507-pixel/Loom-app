import api from "../utils/axiosInstance";

export const jobApi = {

  getJobs: (params) => api.get("/job/jobData", { params }),

  create: (data) => api.post("/job/add", data),

  update: (id, data) => api.put(`/job/edit/${id}`, data),

  delete: (id) => api.delete(`/job/delete/${id}`),

  stats: () => api.get("/job/stats")

};