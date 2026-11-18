
export interface CreateWorkShiftRequest {
    employmentId: string;
    startTime: string;
    endTime: string;
    breakStart: string | null;
    breakEnd: string | null;
    notes: string | null;
}

export interface WorkShiftResponse {
    workShiftId: string;
    employmentId: string;
    startTime: string;
    endTime: string;
    breakStart: string | null;
    breakEnd: string | null;
    notes: string | null;
    workedHours: number;
    version: number;
    createdAt: string;
    updatedAt: string | null;
}

export interface WorkShiftFormData {
    employmentId: string;
    date: string;
    startTime: string;
    endTime: string;
    breakStart: string;
    breakEnd: string;
    notes: string;
    endsNextDay: boolean;
}
