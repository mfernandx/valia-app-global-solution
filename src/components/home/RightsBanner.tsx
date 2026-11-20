import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RightsBanner() {
    return (
        <LinearGradient colors={['#812443', '#C75F5B', '#FFBD91']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.banner}>
            
            <View style={styles.circuloPrincipal} />
            <View style={styles.circuloSecundario} />

            <View style={styles.conteudo}>
                <Text style={styles.titulo}>Seus direitos{'\n'}importam!</Text>
                <Text style={styles.descricao}>Informação, registro{'\n'}e apoio para um{'\n'}trabalho mais justo.</Text>
            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    banner: { 
        minHeight: 155, 
        borderRadius: 17, 
        padding: 20, 
        overflow: 'hidden', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 13 
    },

    conteudo: { 
        flex: 1, 
        zIndex: 2 
    },

    titulo: { 
        fontSize: 21, 
        fontWeight: '800', 
        color: '#FFFFFF', 
        lineHeight: 24, 
        marginBottom: 8 
    },

    descricao: { 
        fontSize: 12, 
        color: '#FFFFFF', 
        lineHeight: 16, 
        fontWeight: '500' 
    },

    ilustracao: { 
        width: 90, 
        height: 110, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        zIndex: 2 
    },

    circuloPrincipal: { 
        position: 'absolute', 
        width: 145, 
        height: 145, 
        borderRadius: 73, 
        backgroundColor: 'rgba(255,232,210,0.2)', 
        right: -35, 
        top: -50 },

    circuloSecundario: { 
        position: 'absolute', 
        width: 115, height: 115, 
        borderRadius: 58, 
        backgroundColor: 'rgba(84,32,57,0.23)', 
        right: 15, 
        bottom: -65 },
});
