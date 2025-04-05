import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});

export const login = (credentials) => apiClient.post('/login', credentials);
export const register = (formData) => apiClient.post('/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
