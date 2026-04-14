import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  },
});

api.interceptors.request.use((config) => {
  const raw = sessionStorage.getItem('auth');
  const auth = raw ? JSON.parse(raw) : null;

  const token = auth?.token; // adjust to your response shape
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
