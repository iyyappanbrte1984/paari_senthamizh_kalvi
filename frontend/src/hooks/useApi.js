import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useToast } from '../components/Toast';

// Auth hooks
export const useAuth = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'user'], data.user);
      localStorage.setItem('token', data.token);
      success('Login successful!');
    },
    onError: (error) => {
      showError(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: () => {
      success('Registration successful! Please login.');
    },
    onError: (error) => {
      showError(error.response?.data?.message || 'Registration failed');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { success } = useToast();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem('token');
      success('Logged out successfully');
    },
  });
};

// Course hooks
export const useCourses = (filters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const response = await api.get('/courses', { params: filters });
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: async () => {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: async (courseData) => {
      const response = await api.post('/courses', courseData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      success('Course created successfully!');
    },
    onError: (error) => {
      showError(error.response?.data?.message || 'Failed to create course');
    },
  });
};

// Test hooks
export const useTests = (filters = {}) => {
  return useQuery({
    queryKey: ['tests', filters],
    queryFn: async () => {
      const response = await api.get('/tests', { params: filters });
      return response.data;
    },
  });
};

export const useTest = (id) => {
  return useQuery({
    queryKey: ['tests', id],
    queryFn: async () => {
      const response = await api.get(`/tests/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useSubmitTest = () => {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: async ({ testId, answers }) => {
      const response = await api.post(`/tests/${testId}/submit`, { answers });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['test-results'] });
      success(`Test submitted! Score: ${data.score}%`);
    },
    onError: (error) => {
      showError(error.response?.data?.message || 'Failed to submit test');
    },
  });
};

// Material hooks
export const useMaterials = (courseId) => {
  return useQuery({
    queryKey: ['materials', courseId],
    queryFn: async () => {
      const response = await api.get(`/materials`, {
        params: { courseId }
      });
      return response.data;
    },
    enabled: !!courseId,
  });
};

export const useVideo = (id) => {
  return useQuery({
    queryKey: ['videos', id],
    queryFn: async () => {
      const response = await api.get(`/videos/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Dashboard hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUserProgress = () => {
  return useQuery({
    queryKey: ['user', 'progress'],
    queryFn: async () => {
      const response = await api.get('/user/progress');
      return response.data;
    },
  });
};

// Generic hooks
export const useApiMutation = (options = {}) => {
  const { success: showSuccess, error: showError } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      if (options.successMessage) {
        showSuccess(options.successMessage);
      }
      if (options.invalidateQueries) {
        queryClient.invalidateQueries(options.invalidateQueries);
      }
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || options.errorMessage || 'An error occurred';
      showError(message);
      options.onError?.(error, variables, context);
    },
  });
};