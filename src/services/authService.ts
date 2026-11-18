
import { api } from './api';
import { ENDPOINTS } from '../config/endpoints';
import type { AuthResponse, LoginRequest, RegisterRequest, UserResponse } from '../models/auth';

export const authService = {
    
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    },

    async getMe(token: string): Promise<UserResponse> {
        const response = await api.get<UserResponse>(ENDPOINTS.AUTH.ME, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
};
