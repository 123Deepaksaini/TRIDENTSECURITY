import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests if present in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trident_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for automatic 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('trident_admin_token');
        localStorage.removeItem('trident_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const submitInquiry = async (data) => {
  const response = await api.post('/inquiries', data);
  return response.data;
};

export const submitQuote = async (data) => {
  const response = await api.post('/quotes', data);
  return response.data;
};

export const submitCareer = async (data) => {
  const response = await api.post('/careers', data);
  return response.data;
};

export const adminLogin = async (usernameOrEmail, password) => {
  const response = await api.post('/auth/login', { usernameOrEmail, password });
  return response.data;
};

export const getAdminMetrics = async () => {
  const response = await api.get('/admin/metrics');
  return response.data;
};

export const getAdminInquiries = async () => {
  const response = await api.get('/admin/inquiries');
  return response.data;
};

export const updateInquiryStatus = async (id, status, notes) => {
  const response = await api.patch(`/admin/inquiries/${id}`, { status, admin_notes: notes });
  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await api.delete(`/admin/inquiries/${id}`);
  return response.data;
};

export const getAdminQuotes = async () => {
  const response = await api.get('/admin/quotes');
  return response.data;
};

export const updateQuoteStatus = async (id, status, notes) => {
  const response = await api.patch(`/admin/quotes/${id}`, { status, admin_notes: notes });
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await api.delete(`/admin/quotes/${id}`);
  return response.data;
};

export const getAdminApplications = async () => {
  const response = await api.get('/admin/applications');
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.patch(`/admin/applications/${id}`, { status });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
