
export interface EmploymentResponse {
    employmentId: string;
    userId: string;
    jobTitle: string;
    employmentType: number;
    admissionDate: string;
    terminationDate: string | null;
    baseSalary: number | null;
    weeklyWorkload: number | null;
    professionalCategory: string | null;
    version: number;
    createdAt: string;
    updatedAt: string | null;
}
