// src/api/axios.ts
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // 🔥 Esto es lo importante para sesiones
});

export default api;
