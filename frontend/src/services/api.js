import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getCurrentUser: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  getUserById: (id) => API.get(`/auth/user/${id}`),
};

// Event APIs
export const eventAPI = {
  getAllEvents: (params) => API.get('/events', { params }),
  getEventById: (id) => API.get(`/events/${id}`),
  createEvent: (data) => API.post('/events/create', data),
  updateEvent: (id, data) => API.put(`/events/${id}`, data),
  deleteEvent: (id) => API.delete(`/events/${id}`),
  joinEvent: (id) => API.post(`/events/${id}/join`),
  leaveEvent: (id) => API.post(`/events/${id}/leave`),
  getUserEvents: () => API.get('/events/user-events'),
  getEventStats: () => API.get('/events/stats'),
};

export default API;
