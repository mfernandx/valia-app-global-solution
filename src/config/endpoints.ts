export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/Auth/login',
        REGISTER: '/api/Auth/register',
        ME: '/api/Auth/me',
    },

    EMPLOYMENT: {
        GET_ALL: '/api/Employment',
        GET_BY_ID: (id: string) => `/api/Employment/${id}`,
    },
    
    WORK_SHIFT: {
        CREATE: '/api/WorkShift',
        GET_BY_ID: (id: string) => `/api/WorkShift/${id}`,
        GET_BY_EMPLOYMENT: (employmentId: string) => `/api/WorkShift/employment/${employmentId}`,
        UPDATE: (id: string) => `/api/WorkShift/${id}`,
        DELETE: (id: string) => `/api/WorkShift/${id}`,
    },
} as const;
