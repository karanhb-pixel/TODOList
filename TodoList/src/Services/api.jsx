import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getTasks: () => api.get("/tasks"),
  createTask: (task) => api.post("/tasks", task),
};
