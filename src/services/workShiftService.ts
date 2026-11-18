import { api } from './api';
import { ENDPOINTS } from '../config/endpoints';
import type { CreateWorkShiftRequest, WorkShiftResponse } from '../models/workShift';

export const workShiftService = {

    async create(data: CreateWorkShiftRequest): Promise<WorkShiftResponse> {
        const response = await api.post<WorkShiftResponse>(ENDPOINTS.WORK_SHIFT.CREATE, data);
        return response.data;
    },

    async getById(id: string): Promise<WorkShiftResponse> {
        const response = await api.get<WorkShiftResponse>(ENDPOINTS.WORK_SHIFT.GET_BY_ID(id));
        return response.data;
    },

    async getByEmployment(employmentId: string): Promise<WorkShiftResponse[]> {
        const response = await api.get<WorkShiftResponse[]>(ENDPOINTS.WORK_SHIFT.GET_BY_EMPLOYMENT(employmentId));
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(ENDPOINTS.WORK_SHIFT.DELETE(id));
    },
    
};
