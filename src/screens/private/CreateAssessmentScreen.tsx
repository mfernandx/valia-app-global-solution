import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AppButton from '../../components/AppButton';
import EmploymentSelector from '../../components/workShift/EmploymentSelector';
import { employmentService } from '../../services/employmentService';
import { workConditionService } from '../../services/workConditionService';
import type { WorkConditionStackParamList } from '../../navigation/WorkConditionNavigator';
import type { CreateWorkConditionAnswerRequest } from '../../models/workCondition';

type NavigationProp = NativeStackNavigationProp<WorkConditionStackParamList, 'CreateAssessment'>;
type ScreenRoute = RouteProp<WorkConditionStackParamList, 'CreateAssessment'>;

function todayUtc() {
    return new Date().toISOString().slice(0, 10);
}

function formatDate(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    if (digits.length > 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
}

function toApiDate(value: string) {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
}

function isValidDate(value: string) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export default function CreateAssessmentScreen() {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ScreenRoute>();
    const insets = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const [employmentId, setEmploymentId] = useState(route.params?.employmentId || '');
    const [assessmentDate, setAssessmentDate] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, { score: number | null; observation: string }>>({});

    const { data: employments = [], isLoading: loadingEmployments, isError: employmentError, refetch: refetchEmployments } = useQuery({
        queryKey: ['employments'],
        queryFn: employmentService.getAll,
    });

    const { data: questions = [], isLoading: loadingQuestions, isError: questionsError, refetch: refetchQuestions } = useQuery({
        queryKey: ['workConditionQuestions'],
        queryFn: workConditionService.getActiveQuestions,
        staleTime: 0,
    });

    const orderedQuestions = [...questions].sort((a, b) => a.displayOrder - b.displayOrder);
    const currentQuestion = orderedQuestions[currentIndex];
    const currentAnswer = currentQuestion ? answers[currentQuestion.workConditionQuestionId] : undefined;
    const answeredCount = orderedQuestions.filter(q => answers[q.workConditionQuestionId]?.score != null).length;

    const mutation = useMutation({
        mutationFn: workConditionService.createAssessment,

        onSuccess: async result => {
            await queryClient.invalidateQueries({ queryKey: ['workConditionAssessments', result.employmentId] });
            navigation.replace('AssessmentDetails', { assessmentId: result.workConditionAssessmentId });
        },

        onError: error => {
            const message = axios.isAxiosError(error) && error.response?.status === 400
                ? 'A API não aceitou a avaliação. Confira a data e tente novamente. Se o questionário foi atualizado, reabra esta tela.'
                : 'Não foi possível salvar a avaliação. Tente novamente.';
            Alert.alert('Erro ao salvar', message);
        },
    });

    function updateAnswer(id: string, changes: { score?: number; observation?: string }) {
        setAnswers(previous => ({
            ...previous,
            [id]: { score: previous[id]?.score ?? null, observation: previous[id]?.observation ?? '', ...changes },
        }));
    }

    function validateHeader() {

        if (!employmentId) {
            Alert.alert('Vínculo obrigatório', 'Selecione um vínculo profissional.');
            return false;
        }

        if (!isValidDate(assessmentDate)) {
            Alert.alert('Data inválida', 'Informe uma data no formato DD/MM/AAAA.');
            return false;
        }

        if (toApiDate(assessmentDate) > todayUtc()) {
            Alert.alert('Data inválida', 'A data da avaliação não pode ser futura.');
            return false;
        }

        return true;
    }

    function nextQuestion() {

        if (!validateHeader()) return;

        if (!currentQuestion || currentAnswer?.score == null) {
            Alert.alert('Resposta obrigatória', 'Selecione uma nota de 1 a 5 para continuar.');
            return;
        }
        setCurrentIndex(index => Math.min(index + 1, orderedQuestions.length - 1));

    }

    function submitAssessment() {
        
        if (!validateHeader()) return;

        const missingIndex = orderedQuestions.findIndex(q => answers[q.workConditionQuestionId]?.score == null);
        
        if (missingIndex !== -1) {
            setCurrentIndex(missingIndex);
            Alert.alert('Questionário incompleto', 'Responda todas as perguntas antes de salvar.');
            return;
        }

        const requestAnswers: CreateWorkConditionAnswerRequest[] = orderedQuestions.map(q => ({
            workConditionQuestionId: q.workConditionQuestionId,
            score: answers[q.workConditionQuestionId].score!,
            observation: answers[q.workConditionQuestionId].observation.trim() || null,
        }));

        mutation.mutate({
            employmentId,
            assessmentDate: toApiDate(assessmentDate),
            answers: requestAnswers,
        });
    }

    const loading = loadingEmployments || loadingQuestions;

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                
                <Pressable onPress={() => navigation.goBack()} style={styles.returnButton}>
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Nova avaliação</Text>
                <Text style={styles.subtitulo}>Conte como estão suas condições de trabalho.</Text>

                {loading ? (

                    <ActivityIndicator color="#8D4059" style={styles.loading} />

                ) : employmentError || questionsError ? (

                    <View style={styles.mensagemCard}>

                        <Text style={styles.mensagem}>Não foi possível carregar os dados da avaliação.</Text>
                        <AppButton title="Tentar novamente" onPress={() => {void refetchEmployments();void refetchQuestions();}} />

                    </View>

                ) : employments.length === 0 ? (

                    <View style={styles.mensagemCard}>
                        <Text style={styles.mensagem}>Cadastre um vínculo profissional antes de realizar a avaliação.</Text>
                    </View>

                ) : orderedQuestions.length === 0 ? (

                    <View style={styles.mensagemCard}>
                        <Ionicons name="document-text-outline" size={30} color="#8D4059" />
                        <Text style={styles.mensagem}>Nenhum questionário ativo está disponível no momento.</Text>
                    </View>

                ) : (
                    <>
                        <EmploymentSelector employments={employments} value={employmentId} onChange={setEmploymentId} />

                        <Text style={styles.label}>Data da avaliação</Text>

                        <View style={styles.dataContainer}>
                            <Ionicons name="calendar-outline" size={20} color="#8D4059" />
                            <TextInput
                                value={assessmentDate}
                                onChangeText={text => setAssessmentDate(formatDate(text))}
                                placeholder="DD/MM/AAAA"
                                placeholderTextColor="#8B747C"
                                keyboardType="number-pad"
                                maxLength={10}
                                style={styles.dataInput}
                            />
                        </View>

                        <View style={styles.progressoHeader}>
                            <Text style={styles.progressoTitulo}>Questionário</Text>
                            <Text style={styles.progressoText}>{currentIndex + 1} de {orderedQuestions.length}</Text>
                        </View>

                        <View style={styles.progressoBackground}>
                            <View style={[styles.nivelProgresso, { width: `${((currentIndex + 1) / orderedQuestions.length) * 100}%` }]} />
                        </View>

                        <View style={styles.questaoCard}>
                            <Text style={styles.categoria}>Categoria: {String(currentQuestion.category)}</Text>
                            <Text style={styles.questao}>{currentQuestion.questionText}</Text>

                            <Text style={styles.label}>Sua avaliação</Text>
                            <View style={styles.scoreRow}>
                                {[1, 2, 3, 4, 5].map(score => (
                                    <Pressable
                                        key={score}
                                        onPress={() => updateAnswer(currentQuestion.workConditionQuestionId, { score })}
                                        style={[styles.scoreButton, currentAnswer?.score === score && styles.scoreSelected]}
                                    >
                                        <Text style={[styles.scoreText, currentAnswer?.score === score && styles.scoreTextSelected]}>{score}</Text>
                                    </Pressable>
                                ))}
                            </View>

                            <View style={styles.scoreLegenda}>
                                <Text style={styles.legendaText}>1 · Menor nota</Text>
                                <Text style={styles.legendaText}>5 · Maior nota</Text>
                            </View>

                            <Text style={styles.label}>Observação (opcional)</Text>
                            <TextInput
                                value={currentAnswer?.observation || ''}
                                onChangeText={text => updateAnswer(currentQuestion.workConditionQuestionId, { observation: text })}
                                placeholder="Conte um pouco mais sobre sua experiência..."
                                placeholderTextColor="#8B747C"
                                multiline
                                maxLength={1000}
                                style={styles.notasInput}
                            />
                            <Text style={styles.contador}>{(currentAnswer?.observation || '').length}/1000</Text>
                        </View>

                        <Text style={styles.respondidosText}>{answeredCount} de {orderedQuestions.length} perguntas respondidas</Text>

                        <View style={styles.acoes}>
                            {currentIndex > 0 && (

                                <Pressable onPress={() => setCurrentIndex(index => index - 1)} style={styles.anteriorButton}>
                                    <Text style={styles.anteriorText}>Anterior</Text>
                                </Pressable>
                                
                            )}
                            <View style={styles.proximoButton}>
                                <AppButton
                                    title={currentIndex === orderedQuestions.length - 1 ? 'Salvar avaliação' : 'Próxima pergunta'}
                                    icon={currentIndex === orderedQuestions.length - 1 ? 'checkmark-outline' : 'arrow-forward-outline'}
                                    onPress={currentIndex === orderedQuestions.length - 1 ? submitAssessment : nextQuestion}
                                    loading={mutation.isPending}
                                />
                            </View>
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

    label: { 
        fontSize: 13, 
        fontWeight: '700', 
        color: '#542039', 
        marginBottom: 8 
    },

    dataContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10, 
        minHeight: 52, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        borderRadius: 15, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 14 
    },
    
    dataInput: { 
        flex: 1, 
        fontSize: 14, 
        color: '#30212A' 
    },

    progressoHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 27, 
        marginBottom: 10 
    },

    progressoTitulo: { 
        fontSize: 16, 
        fontWeight: '800', 
        color: '#542039' 
    },

    progressoText: { 
        fontSize: 13, 
        color: '#8D4059', 
        fontWeight: '700' 
    },

    progressoBackground: { 
        height: 7, 
        backgroundColor: '#EBD4D8', 
        borderRadius: 10, 
        overflow: 'hidden', 
        marginBottom: 20 
    },

    nivelProgresso: { 
        height: '100%', 
        backgroundColor: '#8D4059', 
        borderRadius: 10 
    },

    questaoCard: { 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        borderRadius: 18, 
        padding: 18 
    },

    categoria: { 
        fontSize: 12, 
        color: '#8D4059', 
        fontWeight: '700', 
        marginBottom: 12 
    },

    questao: { 
        fontSize: 18, 
        fontWeight: '800', 
        color: '#542039', 
        lineHeight: 26, 
        marginBottom: 25 
    },

    scoreRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        gap: 7 
    },

    scoreButton: { 
        flex: 1, 
        minHeight: 50, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        backgroundColor: '#FFF7F1', 
        borderRadius: 12, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    scoreSelected: { 
        backgroundColor: '#8D4059', 
        borderColor: '#8D4059' 
    },

    scoreText: { 
        color: '#542039', 
        fontSize: 16, 
        fontWeight: '700' 
    },

    scoreTextSelected: { 
        color: '#FFFFFF' 
    },

    scoreLegenda: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 9, 
        marginBottom: 23 
    },

    legendaText: { 
        fontSize: 11, 
        color: '#806F76' 
    },

    notasInput: { 
        minHeight: 105, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        backgroundColor: '#FFF7F1', 
        borderRadius: 13, 
        padding: 13, 
        fontSize: 14, 
        color: '#30212A', 
        textAlignVertical: 'top' 
    },

    contador: { 
        fontSize: 11, 
        color: '#806F76', 
        textAlign: 'right', 
        marginTop: 6 
    },

    respondidosText: { 
        fontSize: 12, 
        color: '#806F76', 
        textAlign: 'center', 
        marginTop: 18, 
        marginBottom: 15 
    },

    acoes: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10 
    },

    anteriorButton: { 
        paddingHorizontal: 18, 
        paddingVertical: 16, 
        borderWidth: 1, 
        borderColor: '#8D4059', 
        borderRadius: 30 
    },

    anteriorText: { 
        color: '#8D4059', 
        fontWeight: '700' 
    },

    proximoButton: { 
        flex: 1 
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
        textAlign: 'center', 
        lineHeight: 21 
    },

});
