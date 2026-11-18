import axios from 'axios';
import { tokenStorage } from '../security/tokenStorage';

const baseURL = 'http://192.168.15.64:10000';

export const api = axios.create({
    baseURL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
    const token = await tokenStorage.getToken();

    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
});