import axios from 'axios';

const baseURL = 'http://192.168.15.64:10000';

export const api = axios.create({
    baseURL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

