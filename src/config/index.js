export const environment = {
  production: process.env.NODE_ENV === 'production',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || '',
};

const createApiUrl = (path) => `${environment.apiUrl}${environment.apiVersion}${path}`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: createApiUrl('/auth/login'),
    LOGOUT: createApiUrl('/auth/logout'),
    ME: createApiUrl('/auth/me'),
    REFRESH: createApiUrl('/auth/refresh'),
  },
  USERS: {
    LIST: createApiUrl('/users'),
    DETAIL: (id) => createApiUrl(`/users/${id}`),
    CREATE: createApiUrl('/users'),
    UPDATE: (id) => createApiUrl(`/users/${id}`),
    DELETE: (id) => createApiUrl(`/users/${id}`),
  },
  // Add more API endpoints as needed
}


export const config = {
 company: {
   name: 'Vietnamtourist',
   logo: 'https://api.vietnamtourist.me/storage/uploads/logo-login/logo-login1732263083.png',
   supportPhone: '0979245255',
   email: 'info@vietnamtourist.com',
   address: '123 Example Street, District 1, Ho Chi Minh City, Vietnam',
   copyright: '© 2024 Vietnamtourist. All rights reserved.',
   socialMedia: {
     facebook: 'https://facebook.com/vietnamtourist',
     instagram: 'https://instagram.com/vietnamtourist',
     twitter: 'https://twitter.com/vietnamtourist'
   }
 }
}