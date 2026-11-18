import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { WorkConditionAssessmentResponse } from '../../models/workCondition';

interface Props {
    assessment: WorkConditionAssessmentResponse;
    onPress: () => void;
}

export default function AssessmentHistoryCard({ assessment, onPress }: Props) {

    const date = assessment.assessmentDate.split('-').reverse().join('/');

    return (
        <Pressable style={styles.card} onPress={onPress}>

            <View style={styles.iconContainer}>
                <Ionicons name="clipboard-outline" size={23} color="#8D4059" />
            </View>

            <View style={styles.conteudo}>

                <Text style={styles.data}>Avaliação de {date}</Text>
                <Text style={styles.subtitulo}>{assessment.categoryScores.length} categorias avaliadas</Text>
                <Text style={styles.score}>Média geral: {assessment.averageScore.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}/5</Text>
            
            </View>
            <Ionicons name="chevron-forward" size={19} color="#8D4059" />

        </Pressable>
    );
}

const styles = StyleSheet.create({

    card: { 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        borderRadius: 16, 
        padding: 15, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 12 
    },

    iconContainer: { 
        width: 45, 
        height: 45, 
        backgroundColor: '#F9E6DF', 
        borderRadius: 13, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    conteudo: { 
        flex: 1, 
        gap: 4 
    },

    data: { 
        fontSize: 14, 
        fontWeight: '700', 
        color: '#542039' 
    },

    subtitulo: { 
        fontSize: 12, 
        color: '#806F76' 
    },

    score: { 
        fontSize: 13, 
        fontWeight: '700', 
        color: '#8D4059' 
    },
});
