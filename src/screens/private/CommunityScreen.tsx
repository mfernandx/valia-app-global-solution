import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CommunityScreen() {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
            <Text style={styles.titulo}>Comunidade Valia</Text>
            <Text style={styles.descricao}>Um espaço para compartilhar experiências, trocar informações e fortalecer a comunidade de trabalhadores.</Text>
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
});
