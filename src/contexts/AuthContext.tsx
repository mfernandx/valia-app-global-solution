
import React, { createContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { tokenStorage } from '../security/tokenStorage';
import type { AuthResponse, LoginRequest, RegisterRequest, UserResponse } from '../models/auth';

interface AuthContextData {
    user: UserResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = user !== null;

    async function authenticate(response: AuthResponse) {
        await tokenStorage.saveToken(response.token);
        const authenticatedUser = await authService.getMe(response.token);
        setUser(authenticatedUser);
    }

    async function login(data: LoginRequest) {
        const response = await authService.login(data);
        await authenticate(response);
    }

    async function register(data: RegisterRequest) {
        const response = await authService.register(data);
        await authenticate(response);
    }

    async function logout() {
        await tokenStorage.removeToken();
        setUser(null);
    }

    useEffect(() => {
        async function restoreSession() {
            try {
                const token = await tokenStorage.getToken();

                if (!token) return;

                const authenticatedUser = await authService.getMe(token);
                setUser(authenticatedUser);

            } catch {
                await tokenStorage.removeToken();
                setUser(null);

            } finally {
                setIsLoading(false);
            }
        }

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
