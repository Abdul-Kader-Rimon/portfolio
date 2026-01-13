import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("authToken");
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden:", data.message);
          break;
        case 404:
          // Not found
          console.error("Resource not found:", data.message);
          break;
        case 500:
          // Server error
          console.error("Server error:", data.message);
          break;
        default:
          console.error("API Error:", data.message || "Unknown error");
      }
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.message);
    } else {
      // Other error
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const projectsAPI = {
  // Get all projects
  getAll: () => api.get("/projects"),

  // Get project by ID
  getById: (id) => api.get(`/projects/${id}`),

  // Create new project
  create: (projectData) => api.post("/projects", projectData),

  // Update project
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),

  // Delete project
  delete: (id) => api.delete(`/projects/${id}`),

  // Get featured projects
  getFeatured: () => api.get("/projects?featured=true"),
};

export const contactsAPI = {
  // Submit contact form
  submit: (contactData) => api.post("/contacts", contactData),

  // Get all contacts (admin only)
  getAll: () => api.get("/contacts"),

  // Update contact status
  updateStatus: (id, status) => api.patch(`/contacts/${id}/status`, { status }),
};

// Generic API methods
export const apiMethods = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default api;
