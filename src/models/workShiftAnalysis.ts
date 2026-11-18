
export interface WorkShiftRestResponse {
    previousWorkShiftId: string;
    nextWorkShiftId: string;
    previousEndTime: string;
    nextStartTime: string;
    restHours: number;
    belowElevenHours: boolean;
}

export interface WorkShiftAnalysisResponse {
    employmentId: string;
    startDate: string;
    endDate: string;
    totalShifts: number;
    totalWorkedHours: number;
    averageWorkedHours: number;
    shiftsOverEightHours: number;
    restPeriodsBelowElevenHours: number;
    restPeriods: WorkShiftRestResponse[];
}

export interface WorkShiftAnalysisFormData {
    employmentId: string;
    startDate: string;
    endDate: string;
}
