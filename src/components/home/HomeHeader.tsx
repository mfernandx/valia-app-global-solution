import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeHeaderProps {
    fullName?: string;
    onProfilePress: () => void;
}

export default function HomeHeader({ fullName, onProfilePress }: HomeHeaderProps) {
    const firstName = fullName?.trim().split(/\s+/)[0] || 'usuário';

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titulo}>Olá, {firstName}! 👋</Text>
                <Text style={styles.subtitulo}>Que bom ter você aqui!</Text>
            </View>

            <Pressable onPress={onProfilePress} style={styles.perfilButton} accessibilityRole="button" accessibilityLabel="Abrir perfil">
                <Ionicons name="person" size={22} color="#FFFFFF" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20 },

    titulo: { 
        fontSize: 23, 
        fontWeight: '800', 
        color: '#542039' },

    subtitulo: { 
        fontSize: 13, 
        color: '#30212A', 
        marginTop: 3 },

    perfilButton: { 
        width: 42, 
        height: 42, 
        borderRadius: 21, 
        backgroundColor: '#8D4059', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
});
