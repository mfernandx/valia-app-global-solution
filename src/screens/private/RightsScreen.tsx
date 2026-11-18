import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RightsScreen() {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
            <Text style={styles.titulo}>Seus direitos</Text>
            <Text style={styles.descricao}>Informações sobre direitos trabalhistas e orientações para o dia a dia.</Text>
            <Text style={styles.pending}>Conteúdo educativo em desenvolvimento.</Text>
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
        marginBottom: 12 
    },

    descricao: { 
        fontSize: 15, 
        lineHeight: 23, 
        color: '#30212A' 
    },

    pending: { 
        fontSize: 13, 
        color: '#8D4059', 
        marginTop: 20 
    },
});
