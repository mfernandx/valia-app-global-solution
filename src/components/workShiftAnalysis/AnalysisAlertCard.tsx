import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AnalysisAlertCardProps {
    title: string;
    description: string;
    count: number;
}

export default function AnalysisAlertCard({ title, description, count }: AnalysisAlertCardProps) {
    
    const hasAlerts = count > 0;

    return (
        <View style={styles.card}>
            <View style={[styles.iconContainer, hasAlerts ? styles.warningBackground : styles.normalBackground]}>
                
                <Ionicons name={hasAlerts ? 'alert-circle-outline' : 'checkmark-circle-outline'} size={24} color={hasAlerts ? '#B45335' : '#58765C'} />
            
            </View>

            <View style={styles.conteudo}>

                <Text style={styles.titulo}>{title}</Text>
                <Text style={styles.descricao}>{description}</Text>
                <Text style={[styles.contador, { color: hasAlerts ? '#B45335' : '#58765C' }]}>
                    {hasAlerts ? `${count} ocorrência(s) identificada(s)` : 'Nenhuma ocorrência identificada'}
                </Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    card: { 
        flexDirection: 'row', 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        borderRadius: 15, 
        padding: 14, 
        gap: 12 
    },

    iconContainer: { 
        width: 43, 
        height: 43, 
        borderRadius: 12, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    warningBackground: { 
        backgroundColor: '#FBE8DC' 
    },

    normalBackground: { 
        backgroundColor: '#E9F0E7' 
    },

    conteudo: { 
        flex: 1 
    },

    titulo: { 
        fontSize: 14, 
        fontWeight: '700', 
        color: '#542039' 
    },

    descricao: { 
        fontSize: 12, 
        lineHeight: 18, 
        color: '#51464A', 
        marginTop: 5 
    },

    contador: { 
        fontSize: 12, 
        fontWeight: '700', 
        marginTop: 9 
    },
});
