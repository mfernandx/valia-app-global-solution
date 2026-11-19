import { api } from './api';
import { ENDPOINTS } from '../config/endpoints';
import type { CreateEmploymentRequest, Employment, EmploymentResponse, UpdateEmploymentRequest } from '../models/employment';

export const employmentService = {

    async getAll(): Promise<EmploymentResponse[]> {
        const response = await api.get<EmploymentResponse[]>(ENDPOINTS.EMPLOYMENT.GET_ALL);
        return response.data;
    },

    async getById(id: string): Promise<EmploymentResponse> {
        const response = await api.get<EmploymentResponse>(ENDPOINTS.EMPLOYMENT.GET_BY_ID(id));
        return response.data;
    },

    async create(data: CreateEmploymentRequest): Promise<Employment> {
        const response = await api.post<Employment>('/api/Employment', data);
        return response.data;
    },

    async update(id: string, data: UpdateEmploymentRequest): Promise<Employment> {
        const response = await api.put<Employment>(`/api/Employment/${id}`, data);
        return response.data;
    },

    async remove(id: string): Promise<void> {
        await api.delete(`/api/Employment/${id}`);
    },

};
