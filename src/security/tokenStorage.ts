
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'valia_auth_token';

export const tokenStorage = {
    async getToken(): Promise<string | null> {
        return SecureStore.getItemAsync(TOKEN_KEY);
    },

    async saveToken(token: string): Promise<void> {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    },

    async removeToken(): Promise<void> {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    },
};
