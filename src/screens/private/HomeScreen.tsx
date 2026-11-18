
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import { useAuth } from '../../hooks/useAuth';

export default function HomeScreen() {
    const { user, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            
        } catch {
            Alert.alert('Erro', 'Não foi possível encerrar a sessão.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Olá, {user?.fullName}!</Text>
            <Text style={styles.subtitulo}>Você está autenticado no Valia.</Text>
            <AppButton title="Sair da conta" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        padding: 24, 
        backgroundColor: '#FFF7F1' 
    },

    titulo: { 
        fontSize: 26, 
        fontWeight: '700', 
        color: '#542039', 
        marginBottom: 12 
    },

    subtitulo: { 
        fontSize: 16, 
        color: '#30212A', 
        marginBottom: 30 
    },
});
