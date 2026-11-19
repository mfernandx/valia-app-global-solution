import { api } from './api';
import type {CommunityComment,CreateCommunityCommentRequest,UpdateCommunityCommentRequest} from '../models/community';

export const communityCommentService = {

    async getByPostId(postId: string): Promise<CommunityComment[]> {
        const response = await api.get<CommunityComment[]>(`/api/CommunityComment/post/${postId}`);
        return response.data;
    },

    async create(data: CreateCommunityCommentRequest): Promise<CommunityComment> {
        const response = await api.post<CommunityComment>('/api/CommunityComment', data);
        return response.data;
    },

    async update(id: string, data: UpdateCommunityCommentRequest): Promise<CommunityComment> {
        const response = await api.put<CommunityComment>(`/api/CommunityComment/${id}`, data);
        return response.data;
    },

    async remove(id: string): Promise<void> {
        await api.delete(`/api/CommunityComment/${id}`);
    },
    
};
