import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AppButton from '../../components/AppButton';
import EmploymentSelector from '../../components/workShift/EmploymentSelector';
import AnalysisSummaryCard from '../../components/workShiftAnalysis/AnalysisSummaryCard';
import AnalysisAlertCard from '../../components/workShiftAnalysis/AnalysisAlertCard';
import { employmentService } from '../../services/employmentService';
import { workShiftAnalysisService } from '../../services/workShiftAnalysisService';
import { workShiftAnalysisSchema, toApiAnalysisDate } from '../../validations/workShiftAnalysisSchema';
import type { WorkShiftAnalysisFormData } from '../../models/workShiftAnalysis';

function formatDateInput(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    if (digits.length > 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
}

function formatNumber(value: number) {
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}

function formatDateTime(value: string) {
    return new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

export default function WorkShiftAnalysisScreen() {

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [period, setPeriod] = useState<{ employmentId: string; startDate: string; endDate: string } | null>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<WorkShiftAnalysisFormData>({
        resolver: yupResolver(workShiftAnalysisSchema),
        defaultValues: { employmentId: '', startDate: '', endDate: '' },
    });

    const { data: employments = [], isLoading: loadingEmployments, isError: employmentError, refetch: refetchEmployments } = useQuery({
        queryKey: ['employments'],
        queryFn: employmentService.getAll,
    });

    const { data: analysis, isLoading: loadingAnalysis, isError: analysisError, error: requestError, refetch: refetchAnalysis } = useQuery({
        queryKey: ['workShiftAnalysis', period?.employmentId, period?.startDate, period?.endDate],
        queryFn: () => workShiftAnalysisService.analyze(period!.employmentId, period!.startDate, period!.endDate),
        enabled: !!period,
        retry: false,
    });

    function onSubmit(data: WorkShiftAnalysisFormData) {
        setPeriod({
            employmentId: data.employmentId,
            startDate: toApiAnalysisDate(data.startDate),
            endDate: toApiAnalysisDate(data.endDate),
        });
    }

    function getErrorMessage() {
        if (axios.isAxiosError(requestError)) {
            if (requestError.response?.status === 404) return 'O vínculo selecionado não foi encontrado.';
            if (requestError.response?.status === 401) return 'Sua sessão não foi autorizada. Entre novamente na sua conta.';
            if (requestError.response?.status === 400) return 'O período informado não foi aceito pela API.';
        }
        return 'Não foi possível consultar a análise. Verifique sua conexão e tente novamente.';
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                
                <Pressable onPress={() => navigation.goBack()} style={styles.returnButton} accessibilityRole="button" accessibilityLabel="Voltar">
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Análise da jornada</Text>
                <Text style={styles.subtitulo}>Entenda melhor seus registros de trabalho.</Text>

                {loadingEmployments ? (

                    <ActivityIndicator color="#812443" style={styles.loading} />

                ) : employmentError ? (

                    <View style={styles.mensagemCard}>
                        <Text style={styles.mensagem}>Não foi possível carregar seus vínculos.</Text>
                        <AppButton title="Tentar novamente" onPress={() => { void refetchEmployments(); }} />
                    </View>

                ) : employments.length === 0 ? (

                    <View style={styles.mensagemCard}>
                        <Ionicons name="briefcase-outline" size={32} color="#8D4059" />
                        <Text style={styles.mensagem}>Você precisa cadastrar um vínculo profissional para analisar suas jornadas.</Text>
                    </View>

                ) : (
                    <>
                        <Controller control={control} name="employmentId" render={({ field: { value, onChange } }) => (
                            <EmploymentSelector employments={employments} value={value} onChange={onChange} error={errors.employmentId?.message} />
                        )} />

                        <View style={styles.dataRow}>

                            <Controller control={control} name="startDate" render={({ field: { value, onChange } }) => (
                                <View style={styles.dataField}>
                                    <Text style={styles.label}>Data inicial</Text>
                                    <View style={[styles.dataContainer, errors.startDate && styles.errorBorder]}>
                                        <Ionicons name="calendar-outline" size={18} color="#8D4059" />
                                        <TextInput value={value} onChangeText={text => onChange(formatDateInput(text))} placeholder="DD/MM/AAAA" placeholderTextColor="#8B747C" keyboardType="number-pad" maxLength={10} style={styles.dataInput} />
                                    </View>
                                    {errors.startDate && <Text style={styles.errorText}>{errors.startDate.message}</Text>}
                                </View>
                            )} />

                            <Controller control={control} name="endDate" render={({ field: { value, onChange } }) => (
                                <View style={styles.dataField}>
                                    <Text style={styles.label}>Data final</Text>
                                    <View style={[styles.dataContainer, errors.endDate && styles.errorBorder]}>
                                        <Ionicons name="calendar-outline" size={18} color="#8D4059" />
                                        <TextInput value={value} onChangeText={text => onChange(formatDateInput(text))} placeholder="DD/MM/AAAA" placeholderTextColor="#8B747C" keyboardType="number-pad" maxLength={10} style={styles.dataInput} />
                                    </View>
                                    {errors.endDate && <Text style={styles.errorText}>{errors.endDate.message}</Text>}
                                </View>
                            )} />
                        </View>

                        <AppButton title="Analisar jornadas" icon="analytics-outline" onPress={handleSubmit(onSubmit)} loading={loadingAnalysis} />

                        {period && (
                            <View style={styles.resultados}>

                                {loadingAnalysis ? (~

                                    <ActivityIndicator color="#812443" style={styles.loading} />
                                
                                ) : analysisError ? (

                                    <View style={styles.mensagemCard}>
                                        <Text style={styles.mensagem}>{getErrorMessage()}</Text>
                                        <AppButton title="Tentar novamente" onPress={() => { void refetchAnalysis(); }} />
                                    </View>

                                ) : analysis ? (
                                    <>
                                        <Text style={styles.sectionTitulo}>Resumo da jornada</Text>
                                        <Text style={styles.periodoText}>Período: {period.startDate.split('-').reverse().join('/')} a {period.endDate.split('-').reverse().join('/')}</Text>

                                        {analysis.totalShifts === 0 ? (

                                            <View style={styles.mensagemCard}>
                                                <Ionicons name="calendar-outline" size={30} color="#8D4059" />
                                                <Text style={styles.mensagem}>Nenhuma jornada encontrada no período selecionado.</Text>
                                            </View>

                                        ) : (
                                            <>
                                                <View style={styles.sumarioGrid}>
                                                    <AnalysisSummaryCard title="Jornadas registradas" value={String(analysis.totalShifts)} icon="calendar-outline" />
                                                    <AnalysisSummaryCard title="Horas trabalhadas" value={`${formatNumber(analysis.totalWorkedHours)} h`} icon="time-outline" />
                                                    <AnalysisSummaryCard title="Média por jornada" value={`${formatNumber(analysis.averageWorkedHours)} h`} icon="stats-chart-outline" />
                                                    <AnalysisSummaryCard title="Jornadas acima de 8h" value={String(analysis.shiftsOverEightHours)} icon="alert-circle-outline" />
                                                </View>

                                                <Text style={styles.sectionTitulo}>Pontos de atenção</Text>

                                                <View style={styles.listaAlertas}>
                                                    <AnalysisAlertCard title="Jornadas acima de 8 horas" description="Quantidade de jornadas com mais de oito horas efetivamente trabalhadas." count={analysis.shiftsOverEightHours} />
                                                    <AnalysisAlertCard title="Descanso entre jornadas" description="Quantidade de descansos inferiores a onze horas entre o término de uma jornada e o início da próxima." count={analysis.restPeriodsBelowElevenHours} />
                                                </View>

                                                <Text style={styles.sectionTitulo}>Descansos entre jornadas</Text>

                                                {analysis.restPeriods.length === 0 ? (

                                                    <Text style={styles.emptyText}>Não há descansos entre jornadas para apresentar neste período.</Text>
                                                
                                                ) : (
                                                    analysis.restPeriods.map(rest => (
                                                        <View key={`${rest.previousWorkShiftId}-${rest.nextWorkShiftId}`} style={styles.descansoCard}>
                                                            <View style={styles.descansoHeader}>
                                                                <Ionicons name={rest.belowElevenHours ? 'alert-circle-outline' : 'checkmark-circle-outline'} size={21} color={rest.belowElevenHours ? '#B45335' : '#58765C'} />
                                                                <Text style={styles.descansoTitulo}>{formatNumber(rest.restHours)} horas de descanso</Text>
                                                            </View>
                                                            <Text style={styles.descansoDetail}>Saída anterior: {formatDateTime(rest.previousEndTime)}</Text>
                                                            <Text style={styles.descansoDetail}>Próxima entrada: {formatDateTime(rest.nextStartTime)}</Text>
                                                            <Text style={styles.descansoStatus}>{rest.belowElevenHours ? 'Descanso inferior a 11 horas' : 'Descanso de 11 horas ou mais'}</Text>
                                                        </View>
                                                    ))
                                                )}

                                                <View style={styles.infoCard}>
                                                    <Ionicons name="information-circle-outline" size={21} color="#8D4059" />
                                                    <Text style={styles.infoText}>Os indicadores são informativos e não representam, isoladamente, uma conclusão jurídica. A análise considera os registros cadastrados e não verifica todas as particularidades da relação de trabalho.</Text>
                                                </View>
                                            </>
                                        )}
                                    </>
                                ) : null}
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

    dataRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20 
    },

    dataField: { 
        width: '48.5%' 
    },

    label: { 
        fontSize: 12, 
        fontWeight: '700', 
        color: '#542039', 
        marginBottom: 8 
    },

    dataContainer: { 
        minHeight: 52, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        borderRadius: 15, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    
    dataInput: { 
        flex: 1, 
        fontSize: 13, 
        color: '#30212A', 
        paddingVertical: 0 
    },
    
    errorBorder: { 
        borderColor: '#B3261E' 
    },
    
    errorText: { 
        fontSize: 11, 
        color: '#B3261E', 
        marginTop: 5 
    },
    
    resultados: { 
        marginTop: 27 
    },
    
    sectionTitulo: { 
        fontSize: 18, 
        fontWeight: '800', 
        color: '#542039', 
        marginBottom: 12 
    },
    
    periodoText: { 
        fontSize: 12, 
        color: '#806F76', 
        marginBottom: 17 
    },
    
    sumarioGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        rowGap: 10, 
        marginBottom: 27 
    },
    
    listaAlertas: { 
        gap: 11, 
        marginBottom: 27 
    },
    
    descansoCard: { 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        borderRadius: 15, 
        padding: 15, 
        marginBottom: 10 
    },
    
    descansoHeader: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 9, 
        marginBottom: 10 
    },

    descansoTitulo: { 
        fontSize: 15, 
        fontWeight: '700', 
        color: '#542039' 
    },

    descansoDetail: { 
        fontSize: 12, 
        color: '#51464A', 
        marginBottom: 5 
    },

    descansoStatus: { 
        fontSize: 12, 
        fontWeight: '700', 
        color: '#8D4059', 
        marginTop: 6 
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

    emptyText: { 
        fontSize: 13, 
        color: '#806F76', 
        marginBottom: 20 
    },
    
    loading: { 
        marginVertical: 30 
    },
    
    infoCard: { 
        flexDirection: 'row', 
        gap: 9, backgroundColor: '#F9E6DF', 
        borderRadius: 13, 
        padding: 14, 
        marginTop: 20 
    },
    
    infoText: { 
        flex: 1, 
        fontSize: 12,
        color: '#542039', 
        lineHeight: 18 
    },
});
