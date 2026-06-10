import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1',
});

// Interceptor to attach the token to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Interceptor to handle global responses (like 401 Unauthorized)
export const setupInterceptors = (store) => {
    API.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Token is either expired or invalid
                store.dispatch({ type: 'auth/logout' });
                // We don't necessarily want to force a window.location reload here
                // if Redux state properly routes them out via ProtectedRoute, but 
                // just in case we can conditionally redirect or let ProtectedRoute handle it.
            }
            return Promise.reject(error);
        }
    );
};

export default API;
