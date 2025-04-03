import axios from 'axios';


const API_URL = "http://192.168.1.85:8000";

// const API_URL = 'http://localhost:8000';

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (credentials) => axios.post(`${API_URL}/token`, credentials);
export const getTasks = (token) => axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (taskData, token) => axios.post(`${API_URL}/tasks`, taskData, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (taskId, taskData, token) => {
    return axios.put(`${API_URL}/tasks/${taskId}`, taskData, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
  };
  
export const deleteTask = (taskId, token) => axios.delete(`${API_URL}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });