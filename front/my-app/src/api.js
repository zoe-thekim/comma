import axios from 'axios';
export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: { 'Content-Type': 'application/json' },
});