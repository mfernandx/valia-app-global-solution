export type WorkConditionCategory = number | string;

export interface WorkConditionQuestionResponse {
    workConditionQuestionId: string;
    questionText: string;
    category: WorkConditionCategory;
    displayOrder: number;
    questionnaireVersion: number;
}

export interface CreateWorkConditionAnswerRequest {
    workConditionQuestionId: string;
    score: number;
    observation: string | null;
}

export interface CreateWorkConditionAssessmentRequest {
    employmentId: string;
    assessmentDate: string;
    answers: CreateWorkConditionAnswerRequest[];
}

export interface WorkConditionCategoryScoreResponse {
    category: WorkConditionCategory;
    averageScore: number;
    answerCount: number;
}

export interface WorkConditionAssessmentResponse {
    workConditionAssessmentId: string;
    employmentId: string;
    questionnaireVersion: number;
    assessmentDate: string;
    createdAt: string;
    averageScore: number;
    categoryScores: WorkConditionCategoryScoreResponse[];
}



