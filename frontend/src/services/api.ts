import axios from 'axios';

// Configuración base de axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios para diferentes entidades
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const studentService = {
  getAll: async () => {
    const response = await api.get('/student');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/student/${id}`);
    return response.data;
  },
  create: async (studentData: any) => {
    const response = await api.post('/student', studentData);
    return response.data;
  },
  update: async (id: string, studentData: any) => {
    const response = await api.patch(`/student/${id}`, studentData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/student/${id}`);
    return response.data;
  },
};

export const professorService = {
  getAll: async () => {
    const response = await api.get('/professor');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/professor/${id}`);
    return response.data;
  },
  create: async (professorData: any) => {
    const response = await api.post('/professor', professorData);
    return response.data;
  },
  update: async (id: string, professorData: any) => {
    const response = await api.patch(`/professor/${id}`, professorData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/professor/${id}`);
    return response.data;
  },
};

export const courseService = {
  getAll: async () => {
    const response = await api.get('/course');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/course/${id}`);
    return response.data;
  },
  create: async (courseData: any) => {
    const response = await api.post('/course', courseData);
    return response.data;
  },
  update: async (id: string, courseData: any) => {
    const response = await api.patch(`/course/${id}`, courseData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/course/${id}`);
    return response.data;
  },
};

export default api;