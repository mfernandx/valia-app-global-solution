
import { api } from './api';
import type {CreateWorkConditionAssessmentRequest, WorkConditionAssessmentResponse, WorkConditionQuestionResponse} from '../models/workCondition';

export const workConditionService = {

    async getActiveQuestions(): Promise<WorkConditionQuestionResponse[]> {
        const response = await api.get<WorkConditionQuestionResponse[]>('/api/WorkConditionQuestion');
        return response.data;
    },

    async createAssessment(data: CreateWorkConditionAssessmentRequest): Promise<WorkConditionAssessmentResponse> {
        const response = await api.post<WorkConditionAssessmentResponse>('/api/WorkConditionAssessment', data);
        return response.data;
    },

    async getAssessmentById(id: string): Promise<WorkConditionAssessmentResponse> {
        const response = await api.get<WorkConditionAssessmentResponse>(`/api/WorkConditionAssessment/${id}`);
        return response.data;
    },

    async getAssessmentsByEmployment(employmentId: string): Promise<WorkConditionAssessmentResponse[]> {
        const response = await api.get<WorkConditionAssessmentResponse[]>(`/api/WorkConditionAssessment/employment/${employmentId}`);
        return response.data;
    },

};
