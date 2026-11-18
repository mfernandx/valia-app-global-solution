
import { api } from './api';
import type { WorkShiftAnalysisResponse } from '../models/workShiftAnalysis';

export const workShiftAnalysisService = {

    async analyze(employmentId: string, startDate: string, endDate: string): Promise<WorkShiftAnalysisResponse> {
        
        const response = await api.get<WorkShiftAnalysisResponse>(`/api/WorkShiftAnalysis/employment/${employmentId}`, {
            params: { startDate, endDate },
        });

        return response.data;
    },
};
