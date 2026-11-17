export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string | null;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
}

export interface AuthResponse {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    token: string;
    expiresAt: string;
}

export interface UserResponse {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    isActive: boolean;
    createdAt: string;
}
