import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import AppButton from '../../components/AppButton';
import { workConditionService } from '../../services/workConditionService';
import type { WorkConditionStackParamList } from '../../navigation/WorkConditionNavigator';

type ScreenRoute = RouteProp<WorkConditionStackParamList, 'AssessmentDetails'>;

export default function AssessmentDetailsScreen() {

    const navigation = useNavigation();
    const route = useRoute<ScreenRoute>();
    const insets = useSafeAreaInsets();

    const { data: assessment, isLoading, isError, refetch } = useQuery({
        queryKey: ['workConditionAssessment', route.params.assessmentId],
        queryFn: () => workConditionService.getAssessmentById(route.params.assessmentId),
    });

    const formatScore = (value: number) => value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo}>

                <Pressable onPress={() => navigation.goBack()} style={styles.returnButton}>
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Resultado da avaliação</Text>
                <Text style={styles.subtitulo}>Confira os indicadores das suas condições de trabalho.</Text>

                {isLoading ? (

                    <ActivityIndicator color="#8D4059" style={styles.loading} />

                ) : isError || !assessment ? (

                    <View style={styles.mensagemCard}>
                        <Text style={styles.mensagem}>Não foi possível carregar esta avaliação.</Text>
                        <AppButton title="Tentar novamente" onPress={() => { void refetch(); }} />
                    </View>
                    
                ) : (
                    <>
                        <View style={styles.sumarioCard}>

                            <Ionicons name="analytics-outline" size={32} color="#8D4059" />
                            <Text style={styles.sumarioLabel}>Média geral da avaliação</Text>
                            <Text style={styles.media}>{formatScore(assessment.averageScore)} <Text style={styles.maximo}>/ 5</Text></Text>
                            <Text style={styles.data}>Avaliação de {assessment.assessmentDate.split('-').reverse().join('/')}</Text>
                        
                        </View>

                        <Text style={styles.sectionTitulo}>Resultados por categoria</Text>

                        {assessment.categoryScores.map(category => (

                            <View key={String(category.category)} style={styles.categoriaCard}>

                                <View style={styles.categoriaHeader}>
                                    <Text style={styles.categoriaNome}>Categoria {String(category.category)}</Text>
                                    <Text style={styles.categoriaScore}>{formatScore(category.averageScore)}/5</Text>
                                </View>

                                <View style={styles.progressoBackground}>
                                    <View style={[styles.nivelProgresso, { width: `${Math.min(100, Math.max(0, category.averageScore / 5 * 100))}%` }]} />
                                </View>

                                <Text style={styles.contadorRespostas}>{category.answerCount} resposta(s)</Text>
                            
                            </View>
                        ))}

                        <View style={styles.infoCard}>
                            <Ionicons name="information-circle-outline" size={21} color="#8D4059" />
                            <Text style={styles.infoText}>Esses resultados representam as notas informadas na avaliação. A interpretação depende do significado de cada pergunta e da escala definida pelo questionário.</Text>
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: { 
        flex: 1, 
        backgroundColor: '#FFF7F1' 
    },

    conteudo: { 
        paddingHorizontal: 23, 
        paddingBottom: 40 
    },

    returnButton: { 
        width: 44, 
        height: 44, 
        justifyContent: 'center', 
        marginBottom: 8 
    },

    titulo: { 
        fontSize: 25, 
        fontWeight: '800', 
        color: '#542039', 
        marginBottom: 5 
    },

    subtitulo: { 
        fontSize: 14, 
        color: '#51464A', 
        marginBottom: 25 
    },

    loading: { 
        marginTop: 35 
    },

    sumarioCard: { 
        backgroundColor: '#F9E6DF', 
        borderRadius: 20, 
        padding: 25, 
        alignItems: 'center', 
        gap: 9 
    },

    sumarioLabel: { 
        fontSize: 14, 
        fontWeight: '700', 
        color: '#542039' 
    },

    media: { 
        fontSize: 42, 
        fontWeight: '800', 
        color: '#542039' 
    },

    maximo: { 
        fontSize: 20, 
        color: '#8D4059' 
    },

    data: { 
        fontSize: 12, 
        color: '#806F76' 
    },

    sectionTitulo: { 
        fontSize: 19, 
        fontWeight: '800', 
        color: '#542039', 
        marginTop: 28, 
        marginBottom: 15 
    },

    categoriaCard: { 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        borderRadius: 16, 
        padding: 16, 
        marginBottom: 11 
    },

    categoriaHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 13 
    },

    categoriaNome: { 
        fontSize: 14, 
        fontWeight: '700', 
        color: '#542039', 
        flex: 1 
    },

    categoriaScore: { 
        fontSize: 15, 
        fontWeight: '800', 
        color: '#8D4059' 
    },

    progressoBackground: { 
        height: 8, 
        backgroundColor: '#F1DFE3', 
        borderRadius: 10, 
        overflow: 'hidden' 
    },

    nivelProgresso: { 
        height: '100%', 
        backgroundColor: '#8D4059', 
        borderRadius: 10 
    },

    contadorRespostas: { 
        fontSize: 12, 
        color: '#806F76', 
        marginTop: 10 
    },

    infoCard: { 
        flexDirection: 'row', 
        gap: 9, 
        backgroundColor: '#F9E6DF', 
        borderRadius: 13, 
        padding: 14, 
        marginTop: 22 
    },

    infoText: { 
        flex: 1, 
        fontSize: 12, 
        color: '#542039', 
        lineHeight: 18 
    },

    mensagemCard: { 
        backgroundColor: '#F9E6DF', 
        borderRadius: 16, 
        padding: 20, 
        alignItems: 'center', 
        gap: 13 
    },

    mensagem: { 
        fontSize: 14, 
        color: '#542039', 
        textAlign: 'center' 
    },

});
