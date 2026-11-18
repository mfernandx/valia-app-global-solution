import { api } from './api';
import { ENDPOINTS } from '../config/endpoints';
import type { EmploymentResponse } from '../models/employment';

export const employmentService = {

    async getAll(): Promise<EmploymentResponse[]> {
        const response = await api.get<EmploymentResponse[]>(ENDPOINTS.EMPLOYMENT.GET_ALL);
        return response.data;
    },

    async getById(id: string): Promise<EmploymentResponse> {
        const response = await api.get<EmploymentResponse>(ENDPOINTS.EMPLOYMENT.GET_BY_ID(id));
        return response.data;
    },

};
