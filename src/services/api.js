import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/promise/karyawan',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
