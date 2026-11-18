
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export default function ProfileScreen() {

    const { user, logout } = useAuth();
    const insets = useSafeAreaInsets();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        try {
            setIsLoggingOut(true);
            await logout();

        } catch {
            Alert.alert('Erro', 'Não foi possível encerrar sua sessão.');

        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
            <Text style={styles.titulo}>Meu perfil</Text>

            <View style={styles.card}>
                <View style={styles.avatar}>
                    <Ionicons name="person" size={32} color="#FFFFFF" />
                </View>

                <Text style={styles.nome}>{user?.fullName}</Text>
                <Text style={styles.email}>{user?.email}</Text>
                {user?.phoneNumber && <Text style={styles.telefone}>{user.phoneNumber}</Text>}
            </View>

            <AppButton title="Sair da conta" icon="log-out-outline" onPress={handleLogout} loading={isLoggingOut} />
        </View>
    );
}

const styles = StyleSheet.create({

    container: { 
        flex: 1, 
        paddingHorizontal: 24, 
        backgroundColor: '#FFF7F1' 
    },

    titulo: { 
        fontSize: 25, 
        fontWeight: '800', 
        color: '#542039', 
        marginBottom: 24 
    },

    card: { 
        backgroundColor: '#F9E6DF', 
        borderRadius: 20, 
        padding: 24, 
        alignItems: 'center', 
        marginBottom: 25 
    },

    avatar: { 
        width: 70, 
        height: 70, 
        borderRadius: 35, 
        backgroundColor: '#8D4059', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 14 
    },

    nome: { 
        fontSize: 20, 
        fontWeight: '700', 
        color: '#542039', 
        textAlign: 'center' 
    },

    email: { 
        fontSize: 14, 
        color: '#30212A', 
        marginTop: 5 },

    telefone: { 
        fontSize: 13, 
        color: '#51464A', 
        marginTop: 5 
    },
});
