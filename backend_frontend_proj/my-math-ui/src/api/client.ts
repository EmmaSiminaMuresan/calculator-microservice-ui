import axios from 'axios';

const api = axios.create({
  // nu mai specifici baseURL (totul e proxiat de Vite)
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

export default api;
