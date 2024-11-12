import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});

export const register = (data) => api.post('/auth/register', data);

export const login = (data) => api.post('/auth/login', data);

export const verifyOTP = (data) => api.post('/auth/verify-otp', data);

export const checkSession = () => api.get('/auth/check-session');

export const getTasks = () => api.get('/tasks');

export const createTask = (data) => api.post('/tasks', data);

export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
