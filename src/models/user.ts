export interface UserResponse {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface UpdateUserEmailRequest {
    email: string;
}

export interface UpdateUserPhoneRequest {
    phoneNumber: string | null;
}
