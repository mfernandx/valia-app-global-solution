import { api } from './api';
import type {CommunityPost,CreateCommunityPostRequest,UpdateCommunityPostRequest} from '../models/community';

export const communityPostService = {

    async getAll(): Promise<CommunityPost[]> {
        const response = await api.get<CommunityPost[]>('/api/CommunityPost');
        return response.data;
    },

    async getById(id: string): Promise<CommunityPost> {
        const response = await api.get<CommunityPost>(`/api/CommunityPost/${id}`);
        return response.data;
    },

    async create(data: CreateCommunityPostRequest): Promise<CommunityPost> {
        const response = await api.post<CommunityPost>('/api/CommunityPost', data);
        return response.data;
    },

    async update(id: string, data: UpdateCommunityPostRequest): Promise<CommunityPost> {
        const response = await api.put<CommunityPost>(`/api/CommunityPost/${id}`, data);
        return response.data;
    },

    async remove(id: string): Promise<void> {
        await api.delete(`/api/CommunityPost/${id}`);
    },
    
};
