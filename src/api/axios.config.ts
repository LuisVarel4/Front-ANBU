// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // 🔥 Esto es lo importante para sesiones
});

export default api;
