import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.126:8000";

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (credentials) => axios.post(`${API_URL}/token`, credentials);
export const getTasks = async () => {
  const token = await AsyncStorage.getItem('token');
  return axios.get(`${API_URL}/tasks`, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
};
export const createTask = async (taskData) => {
  const token = await AsyncStorage.getItem('token');
  return axios.post(`${API_URL}/tasks`, taskData, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
};
export const updateTask = async (taskId, taskData) => {
  const token = await AsyncStorage.getItem('token');
  return axios.put(`${API_URL}/tasks/${taskId}`, taskData, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
};
export const deleteTask = async (taskId) => {
  const token = await AsyncStorage.getItem('token');
  return axios.delete(`${API_URL}/tasks/${taskId}`, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
};