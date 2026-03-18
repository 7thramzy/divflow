import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Use relative URL to leverage Next.js rewrites (avoids CORS issues)
const API_BASE_URL = '/api';

// Helper function to extract data from API responses
export function extractData<T>(response: AxiosResponse<unknown> | unknown): T {
  if (!response) return [] as unknown as T;
  
  // Handle Axios response structure
  const axiosResponse = response as AxiosResponse<unknown>;
  const data = axiosResponse.data !== undefined ? axiosResponse.data : response;
  
  // Handle nested Laravel { data: { data: [] } } structure
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }
  
  return data as T;
}

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor to attach bearer token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('divflow_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and unauthenticated sessions
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error - no response received');
      return Promise.reject({
        message: 'فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
        isNetworkError: true,
        originalError: error,
      });
    }

    const { status, data } = error.response;

    // Handle authentication errors
    if (status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('divflow_token');
        localStorage.removeItem('divflow_user');
        window.location.href = '/login';
      }
    }

    // Handle validation errors (422)
    if (status === 422 && data && typeof data === 'object') {
      const validationErrors = (data as { errors?: Record<string, string[]> }).errors;
      if (validationErrors) {
        const errorMessages = Object.values(validationErrors).flat().join(', ');
        return Promise.reject({
          message: errorMessages || 'خطأ في التحقق من البيانات',
          status,
          errors: validationErrors,
          isValidationError: true,
        });
      }
    }

    // Handle other errors
    const errorMessage = (data as { message?: string })?.message || `خطأ ${status}: حدث خطأ غير متوقع`;
    return Promise.reject({
      message: errorMessage,
      status,
      data,
    });
  }
);



// Helper function to extract paginated response
interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface LaravelResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface ApiDataResponse<T> {
  data?: T[] | LaravelResponse<T>;
}

export function extractPaginatedData<T>(response: unknown): PaginatedData<T> {
  if (!response) {
    return {
      data: [] as T[],
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: 0,
    };
  }

  const res = response as { data?: ApiDataResponse<T>['data'] };
  const raw = res.data;

  // Laravel-style pagination with meta
  if (raw && typeof raw === 'object' && 'meta' in raw && Array.isArray((raw as LaravelResponse<T>).data)) {
    const laravelRes = raw as LaravelResponse<T>;
    return {
      data: laravelRes.data,
      current_page: laravelRes.meta.current_page || 1,
      last_page: laravelRes.meta.last_page || 1,
      per_page: laravelRes.meta.per_page || 20,
      total: laravelRes.meta.total || 0,
    };
  }

  // Simple array in data property
  if (raw && Array.isArray(raw)) {
    return {
      data: raw as T[],
      current_page: 1,
      last_page: 1,
      per_page: raw.length,
      total: raw.length,
    };
  }

  // Fallback
  return {
    data: [] as T[],
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };
}

// Generic API request wrapper with better error handling
export async function apiRequest<T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await api.request({
      method,
      url,
      data,
      ...config,
    });
    return extractData<T>(response);
  } catch (error: unknown) {
    console.error(`API ${method.toUpperCase()} ${url} error:`, error);
    throw error;
  }
}

// Export individual methods for convenience
export function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  return apiRequest<T>('get', url, undefined, config);
}

export function apiPost<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return apiRequest<T>('post', url, data, config);
}

export function apiPut<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return apiRequest<T>('put', url, data, config);
}

export function apiPatch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return apiRequest<T>('patch', url, data, config);
}

export function apiDelete<T>(url: string, config?: AxiosRequestConfig) {
  return apiRequest<T>('delete', url, undefined, config);
}
