import { api } from './api';
import type {UserResponse,UpdateUserEmailRequest,UpdateUserPhoneRequest} from '../models/user';

export const userService = {

    async getMe(): Promise<UserResponse> {
        const response = await api.get<UserResponse>('/api/Auth/me');
        return response.data;
    },

    async updateEmail(data: UpdateUserEmailRequest): Promise<void> {
        await api.patch('/api/User/me/email', data);
    },

    async updatePhone(data: UpdateUserPhoneRequest): Promise<void> {
        await api.patch('/api/User/me/phone', data);
    },

    async deactivateAccount(): Promise<void> {
        await api.patch('/api/User/me/deactivate');
    },
    
};

