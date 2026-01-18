import axios from 'axios';
export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    //xsrfCookieName: "XSRF-TOKEN",
    //xsrfHeaderName: "X-XSRF-TOKEN",
    headers: { 'Content-Type': 'application/json' },
});

// 요청 로깅 (디버깅용)
api.interceptors.request.use(
    (config) => {
        console.log('🚀 API 요청:', config.method.toUpperCase(), config.url);
        console.log('📦 요청 데이터:', config.data);
        return config;
    },
    (error) => {
        console.error('❌ 요청 에러:', error);
        return Promise.reject(error);
    }
);

// 응답 로깅 (디버깅용)
api.interceptors.response.use(
    (response) => {
        console.log('✅ API 응답:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('❌ 응답 에러:', error.response?.status, error.response?.data);
        console.error('❌ 전체 에러:', error);
        return Promise.reject(error);
    }
);