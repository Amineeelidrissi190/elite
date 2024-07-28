import axios from 'axios';
import Swal from 'sweetalert2';

// Crée une instance d'Axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Ajouter un intercepteur pour les requêtes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Ajouter un intercepteur pour les réponses
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // Afficher le message d'expiration de session
      await Swal.fire({
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        icon: 'warning',
        confirmButtonText: 'Login',
      });

      // Supprimer le token et rediriger vers la page de connexion
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
