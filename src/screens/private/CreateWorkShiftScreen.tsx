import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AppButton from '../../components/AppButton';
import EmploymentSelector from '../../components/workShift/EmploymentSelector';
import TimeInput from '../../components/workShift/TimeInput';
import { employmentService } from '../../services/employmentService';
import { workShiftService } from '../../services/workShiftService';
import { workShiftSchema } from '../../validations/workShiftSchema';
import { buildWorkShiftRequest } from '../../utils/workShiftDate';
import type { WorkShiftFormData } from '../../models/workShift';

export default function CreateWorkShiftScreen() {

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const { data: employments = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['employments'],
        queryFn: employmentService.getAll,
    });

    const { control, handleSubmit, formState: { errors } } = useForm<WorkShiftFormData>({
        resolver: yupResolver(workShiftSchema),
        defaultValues: { employmentId: '', date: '', startTime: '', endTime: '', breakStart: '', breakEnd: '', notes: '', endsNextDay: false },
    });

    const mutation = useMutation({
        mutationFn: workShiftService.create,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['workShifts'] });
            Alert.alert('Jornada registrada!', 'Seu registro foi salvo com sucesso.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        },
        onError: () => Alert.alert('Erro', 'Não foi possível registrar a jornada. Verifique os dados e tente novamente.'),
    });

    function onSubmit(data: WorkShiftFormData) {
        mutation.mutate(buildWorkShiftRequest(data));
    }

    function formatDate(text: string) {
        const digits = text.replace(/\D/g, '').slice(0, 8);
        if (digits.length > 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
        if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
        return digits;
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                
                <Pressable onPress={() => navigation.goBack()} style={styles.returnButton}>
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Registrar jornada</Text>
                <Text style={styles.subtitulo}>Registre seus horários de trabalho.</Text>

                {isLoading ? (

                    <ActivityIndicator color="#812443" style={styles.loading} />

                ) : isError ? (

                    <View style={styles.mensagemCard}>
                        <Text style={styles.mensagem}>Não foi possível carregar seus vínculos.</Text>
                        <AppButton title="Tentar novamente" onPress={() => { void refetch(); }} />
                    </View>

                ) : employments.length === 0 ? (

                    <View style={styles.mensagemCard}>
                        <Ionicons name="briefcase-outline" size={32} color="#8D4059" />
                        <Text style={styles.mensagem}>Você precisa cadastrar um vínculo profissional antes de registrar uma jornada.</Text>
                    </View>

                ) : (
                    <>
                        <Controller control={control} name="employmentId" render={({ field: { value, onChange } }) => (
                            <EmploymentSelector employments={employments} value={value} onChange={onChange} error={errors.employmentId?.message} />
                        )} />

                        <Text style={styles.label}>Data da jornada</Text>

                        <Controller control={control} name="date" render={({ field: { value, onChange } }) => (
                            <View style={[styles.dataContainer, errors.date && styles.errorBorder]}>
                                <Ionicons name="calendar-outline" size={20} color="#8D4059" />
                                <TextInput value={value} onChangeText={text => onChange(formatDate(text))} placeholder="DD/MM/AAAA" placeholderTextColor="#8B747C" keyboardType="number-pad" maxLength={10} style={styles.dataInput} />
                            </View>
                        )} />

                        {errors.date && <Text style={styles.errorText}>{errors.date.message}</Text>}

                        <View style={styles.tempoRow}>
                            <Controller control={control} name="startTime" render={({ field: { value, onChange } }) => (
                                <TimeInput label="Entrada" value={value} onChange={onChange} error={errors.startTime?.message} />
                            )} />
                            <Controller control={control} name="endTime" render={({ field: { value, onChange } }) => (
                                <TimeInput label="Saída" value={value} onChange={onChange} error={errors.endTime?.message} />
                            )} />
                        </View>

                        <Controller control={control} name="endsNextDay" render={({ field: { value, onChange } }) => (
                            <View style={styles.switchRow}>
                                <Text style={styles.switchText}>A saída ocorreu no dia seguinte?</Text>
                                <Switch value={value} onValueChange={onChange} trackColor={{ true: '#D76D45' }} thumbColor="#FFFFFF" />
                            </View>
                        )} />

                        <View style={styles.tempoRow}>
                            <Controller control={control} name="breakStart" render={({ field: { value, onChange } }) => (
                                <TimeInput label="Início do intervalo" value={value} onChange={onChange} error={errors.breakStart?.message} />
                            )} />
                            <Controller control={control} name="breakEnd" render={({ field: { value, onChange } }) => (
                                <TimeInput label="Fim do intervalo" value={value} onChange={onChange} error={errors.breakEnd?.message} />
                            )} />
                        </View>

                        <Text style={styles.label}>Observações (opcional)</Text>
                        <Controller control={control} name="notes" render={({ field: { value, onChange } }) => (
                            <TextInput value={value} onChangeText={onChange} placeholder="Adicione informações sobre sua jornada..." placeholderTextColor="#8B747C" multiline maxLength={1000} style={styles.notasInput} />
                        )} />
                        {errors.notes && <Text style={styles.errorText}>{errors.notes.message}</Text>}

                        <View style={styles.infoCard}>
                            <Ionicons name="information-circle-outline" size={21} color="#8D4059" />
                            <Text style={styles.infoText}>Os horários serão registrados no seu histórico. A análise de possíveis irregularidades será feita em uma funcionalidade separada.</Text>
                        </View>

                        <AppButton title="Salvar jornada" icon="checkmark-outline" onPress={handleSubmit(onSubmit)} loading={mutation.isPending} />
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
        marginBottom: 26 
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
        minHeight: 52, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        borderRadius: 15, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 14, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10 
    },
    
    dataInput: { 
        flex: 1, 
        fontSize: 14, 
        color: '#30212A' 
    },

    errorBorder: { 
        borderColor: '#B3261E' 
    },

    errorText: { 
        fontSize: 12, 
        color: '#B3261E', 
        marginTop: 5, 
        marginBottom: 12 
    },

    tempoRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 17 
    },

    switchRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 3, 
        marginBottom: 5 
    },
    
    switchText: { 
        fontSize: 13, 
        color: '#30212A', 
        flex: 1 
    },
    
    notasInput: { 
        minHeight: 95, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        borderRadius: 15, 
        backgroundColor: '#FFFFFF', 
        padding: 14, 
        fontSize: 14, 
        color: '#30212A', 
        textAlignVertical: 'top' 
    },
    
    infoCard: { 
        flexDirection: 'row', 
        gap: 9, 
        backgroundColor: '#F9E6DF', 
        borderRadius: 13, 
        padding: 14, 
        marginTop: 20, 
        marginBottom: 22 
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
        padding: 22, 
        alignItems: 'center', 
        gap: 14, 
        marginTop: 20 },
    
    mensagem: { 
        fontSize: 14, 
        color: '#542039', 
        textAlign: 'center', 
        lineHeight: 21 
    },
});