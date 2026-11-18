import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import AppButton from '../../components/AppButton';
import EmploymentSelector from '../../components/workShift/EmploymentSelector';
import AssessmentHistoryCard from '../../components/workCondition/AssessmentHistoryCard';
import { employmentService } from '../../services/employmentService';
import { workConditionService } from '../../services/workConditionService';
import type { WorkConditionStackParamList } from '../../navigation/WorkConditionNavigator';

type NavigationProp = NativeStackNavigationProp<WorkConditionStackParamList, 'WorkConditionList'>;

export default function WorkConditionScreen() {
    
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const [employmentId, setEmploymentId] = useState('');

    const { data: employments = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['employments'],
        queryFn: employmentService.getAll,
    });

    const { data: assessments = [], isLoading: loadingAssessments, isError: assessmentsError, refetch: refetchAssessments } = useQuery({
        queryKey: ['workConditionAssessments', employmentId],
        queryFn: () => workConditionService.getAssessmentsByEmployment(employmentId),
        enabled: !!employmentId,
    });

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo}>

                <Pressable onPress={() => navigation.getParent()?.goBack()} style={styles.returnButton}>
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Condições de trabalho</Text>
                <Text style={styles.subtitulo}>Sua experiência no trabalho importa.</Text>

                <View style={styles.banner}>

                    <Ionicons name="heart-outline" size={27} color="#8D4059" />
                    <View style={styles.bannerConteudo}>
                        <Text style={styles.bannerTitulo}>Um espaço para você se expressar</Text>
                        <Text style={styles.bannerText}>Registre como estão suas condições de trabalho e acompanhe suas avaliações ao longo do tempo.</Text>
                    </View>

                </View>

                {isLoading ? (

                    <ActivityIndicator color="#812443" style={styles.loading} />

                ) : isError ? (

                    <View style={styles.mensagemCard}>
                        <Text style={styles.mensagem}>Não foi possível carregar seus vínculos.</Text>
                        <AppButton title="Tentar novamente" onPress={() => { void refetch(); }} />
                    </View>

                ) : employments.length === 0 ? (

                    <View style={styles.mensagemCard}>
                        <Ionicons name="briefcase-outline" size={30} color="#8D4059" />
                        <Text style={styles.mensagem}>Cadastre um vínculo profissional para começar suas avaliações.</Text>
                    </View>

                ) : (
                    <>
                        <EmploymentSelector employments={employments} value={employmentId} onChange={setEmploymentId} />

                        <AppButton title="Nova avaliação" icon="add-outline" onPress={() => navigation.navigate('CreateAssessment', { employmentId: employmentId || undefined })} />

                        <Text style={styles.sectionTitulo}>Histórico de avaliações</Text>

                        {!employmentId ? 
                        (
                            <Text style={styles.ajuda}>Selecione um vínculo para consultar suas avaliações anteriores.</Text>
                        
                        ) : loadingAssessments ? (

                            <ActivityIndicator color="#812443" style={styles.loading} />

                        ) : assessmentsError ? (

                            <View style={styles.mensagemCard}>
                                <Text style={styles.mensagem}>Não foi possível carregar o histórico.</Text>
                                <AppButton title="Tentar novamente" onPress={() => { void refetchAssessments(); }} />
                            </View>

                        ) : assessments.length === 0 ? (

                            <View style={styles.mensagemCard}>
                                <Ionicons name="clipboard-outline" size={30} color="#8D4059" />
                                <Text style={styles.mensagem}>Nenhuma avaliação registrada para este vínculo.</Text>
                            </View>

                        ) : (

                            <View style={styles.lista}>
                                {assessments.map(assessment => (
                                    <AssessmentHistoryCard key={assessment.workConditionAssessmentId} assessment={assessment} onPress={() => navigation.navigate('AssessmentDetails', { assessmentId: assessment.workConditionAssessmentId })} />
                                ))}
                            </View>
                        )}
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
        paddingBottom: 35 
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
        marginBottom: 22 
    },

    banner: { 
        flexDirection: 'row', 
        gap: 12, 
        backgroundColor: '#F9E6DF', 
        borderRadius: 17, 
        padding: 17, 
        marginBottom: 25 
    },

    bannerConteudo: { 
        flex: 1 
    },

    bannerTitulo: { 
        fontSize: 14, 
        fontWeight: '800', 
        color: '#542039', 
        marginBottom: 7, 
        marginTop: 5
    },

    bannerText: { 
        fontSize: 12, 
        color: '#51464A', 
        lineHeight: 19 
    },

    loading: { 
        marginTop: 30 
    },

    sectionTitulo: { 
        fontSize: 18, 
        fontWeight: '800', 
        color: '#542039', 
        marginTop: 28, 
        marginBottom: 15 
    },

    ajuda: { 
        fontSize: 13, 
        color: '#806F76', 
        textAlign: 'center', 
        marginTop: 12 
    },

    mensagemCard: { 
        backgroundColor: '#F9E6DF', 
        borderRadius: 16, 
        padding: 20, 
        alignItems: 'center', 
        gap: 13, 
        marginTop: 15 
    },

    mensagem: { 
        fontSize: 14, 
        color: '#542039', 
        textAlign: 'center', 
        lineHeight: 21 
    },

    lista: { 
        gap: 11 
    },
});
