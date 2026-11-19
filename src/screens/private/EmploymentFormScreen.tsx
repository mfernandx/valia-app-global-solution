import { useEffect } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { InferType } from 'yup';
import { employmentSchema } from '../../validations/employmentSchema';
import { employmentService } from '../../services/employmentService';
import { employmentTypeOptions } from '../../utils/employmentType';
import type { EmploymentStackParamList } from '../../navigation/EmploymentNavigator';
import type { CreateEmploymentRequest } from '../../models/employment';

type NavigationProp = NativeStackNavigationProp<EmploymentStackParamList, 'EmploymentForm'>;
type RouteProp = NativeStackScreenProps<EmploymentStackParamList, 'EmploymentForm'>['route'];
type FormData = InferType<typeof employmentSchema>;

function formatDateInput(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function toApiDate(value?: string | null) {
    if (!value) return null;
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
}

function toDisplayDate(value?: string | null) {
    if (!value) return '';
    const [year, month, day] = value.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}

function parseDecimal(value?: number | null) {
    return value === undefined || value === null ? null : value;
}

function getErrorMessage(error: unknown) {

    const err = error as {
        response?: { data?: { detail?: string; title?: string; message?: string } };
    };

    return err.response?.data?.detail ??
        err.response?.data?.message ??
        err.response?.data?.title ??
        'Não foi possível salvar o vínculo. Tente novamente.';

}

export default function EmploymentFormScreen() {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp>();
    const queryClient = useQueryClient();
    const employmentId = route.params?.employmentId;
    const isEditing = Boolean(employmentId);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(employmentSchema),
        defaultValues: {
            jobTitle: '',
            employmentType: undefined,
            admissionDate: '',
            terminationDate: '',
            baseSalary: null,
            weeklyWorkload: null,
            professionalCategory: '',
        },
    });

    const { data: employment, isLoading, isError, refetch } = useQuery({
        queryKey: ['employment', employmentId],
        queryFn: () => employmentService.getById(employmentId!),
        enabled: isEditing,
    });

    useEffect(() => {

        if (!employment) return;

        const employmentType = Number(employment.employmentType);

        reset({
            jobTitle: employment.jobTitle,
            employmentType: Number.isFinite(employmentType) ? employmentType : undefined,
            admissionDate: toDisplayDate(employment.admissionDate),
            terminationDate: toDisplayDate(employment.terminationDate),
            baseSalary: employment.baseSalary,
            weeklyWorkload: employment.weeklyWorkload,
            professionalCategory: employment.professionalCategory ?? '',
        });

    }, [employment, reset]);

    const mutation = useMutation({
        mutationFn: async (data: CreateEmploymentRequest) => {
            if (employmentId) return employmentService.update(employmentId, data);
            return employmentService.create(data);
        },
        onSuccess: async saved => {
            await queryClient.invalidateQueries({ queryKey: ['employments'] });
            await queryClient.invalidateQueries({ queryKey: ['employment', saved.employmentId] });

            Alert.alert(
                'Sucesso!',
                isEditing ? 'Vínculo atualizado com sucesso.' : 'Vínculo cadastrado com sucesso.',
                [{
                    text: 'OK',
                    onPress: () => {
                        if (isEditing) {
                            navigation.goBack();
                        } else {
                            navigation.replace('EmploymentDetails', { employmentId: saved.employmentId });
                        }
                    },
                }]
            );
        },
        onError: error => Alert.alert('Erro ao salvar', getErrorMessage(error)),
    });

    const onSubmit = (values: FormData) => {

        const payload: CreateEmploymentRequest = {
            jobTitle: values.jobTitle.trim(),
            employmentType: values.employmentType,
            admissionDate: toApiDate(values.admissionDate)!,
            terminationDate: toApiDate(values.terminationDate),
            baseSalary: parseDecimal(values.baseSalary),
            weeklyWorkload: parseDecimal(values.weeklyWorkload),
            professionalCategory: values.professionalCategory?.trim() || null,
        };

        mutation.mutate(payload);
    };

    if (isEditing && isLoading) {

        return (

            <View style={styles.center}>
                <ActivityIndicator size="large" color={'#8D4059'} />
                <Text style={styles.ajudaText}>Carregando vínculo...</Text>
            </View>

        );
    }

    if (isEditing && isError) {

        return (

            <View style={styles.center}>
                <Text style={styles.ajudaText}>Não foi possível carregar os dados do vínculo.</Text>

                <Pressable onPress={() => { void refetch(); }}>
                    <Text style={styles.retryText}>Tentar novamente</Text>
                </Pressable>
            </View>

        );

    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                ~
                <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={'#542039'} />
                </Pressable>

                <Text style={styles.titulo}>{isEditing ? 'Editar vínculo' : 'Novo vínculo'}</Text>

                <Text style={styles.subtitulo}>
                    {isEditing ? 'Atualize as informações do seu vínculo profissional.' : 'Cadastre suas informações profissionais para acompanhar sua trajetória.'}
                </Text>

                <Text style={styles.label}>Cargo ou função *</Text>

                <Controller control={control} name="jobTitle" render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput style={styles.input} placeholder="Ex.: Assistente administrativo" placeholderTextColor="#9A8C91" value={value} onChangeText={onChange} onBlur={onBlur} maxLength={150} />
                )} />

                {errors.jobTitle && <Text style={styles.error}>{errors.jobTitle.message}</Text>}

                <Text style={styles.label}>Tipo de contratação *</Text>

                <Controller control={control} name="employmentType" render={({ field: { value, onChange } }) => (
                    <View style={styles.opcoes}>
                        {employmentTypeOptions.map(option => (
                            <Pressable key={option.value}
                                style={[styles.opcao, value === option.value && styles.opcaoSelected]}
                                onPress={() => onChange(option.value)}>
                                <Text style={[styles.opcaoText, value === option.value && styles.opcaoTextSelected]}>{option.label}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
                />
                {errors.employmentType && <Text style={styles.error}>{errors.employmentType.message}</Text>}

                <Text style={styles.label}>Data de admissão *</Text>

                <Controller control={control} name="admissionDate"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput style={styles.input} placeholder="DD/MM/AAAA" keyboardType="number-pad" placeholderTextColor="#9A8C91" value={value} onChangeText={text => onChange(formatDateInput(text))} onBlur={onBlur} maxLength={10} />
                    )}
                />

                {errors.admissionDate && <Text style={styles.error}>{errors.admissionDate.message}</Text>}

                <Text style={styles.label}>Data de desligamento (opcional)</Text>

                <Controller control={control} name="terminationDate"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput style={styles.input} placeholder="DD/MM/AAAA" keyboardType="number-pad"
                            placeholderTextColor="#9A8C91" value={value ?? ''}
                            onChangeText={text => onChange(formatDateInput(text))} onBlur={onBlur}
                            maxLength={10} />
                    )}
                />

                {errors.terminationDate && <Text style={styles.error}>{errors.terminationDate.message}</Text>}

                <Text style={styles.label}>Salário-base (opcional)</Text>

                <Controller control={control} name="baseSalary"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput style={styles.input} placeholder="Ex.: 2500,00"
                            keyboardType="decimal-pad" placeholderTextColor="#9A8C91"
                            value={value === null || value === undefined ? '' : String(value).replace('.', ',')}
                            onChangeText={onChange} onBlur={onBlur} />
                    )}
                />

                {errors.baseSalary && <Text style={styles.error}>{errors.baseSalary.message}</Text>}

                <Text style={styles.label}>Carga horária semanal (opcional)</Text>

                <Controller control={control} name="weeklyWorkload"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput style={styles.input} placeholder="Ex.: 44"
                            keyboardType="decimal-pad" placeholderTextColor="#9A8C91"
                            value={value === null || value === undefined ? '' : String(value).replace('.', ',')}
                            onChangeText={onChange} onBlur={onBlur} />
                    )}
                />

                {errors.weeklyWorkload && <Text style={styles.error}>{errors.weeklyWorkload.message}</Text>}

                <Text style={styles.label}>Categoria profissional (opcional)</Text>
                <Controller control={control} name="professionalCategory"
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput style={styles.input} placeholder="Ex.: Comércio"
                            placeholderTextColor="#9A8C91" value={value ?? ''}
                            onChangeText={onChange} onBlur={onBlur} maxLength={150} />
                    )}
                />

                {errors.professionalCategory && <Text style={styles.error}>{errors.professionalCategory.message}</Text>}

                <Pressable style={[styles.salvarButton, mutation.isPending && styles.disabledButton]} onPress={() => { void handleSubmit(onSubmit)(); }} disabled={mutation.isPending}>
                    {mutation.isPending ? <ActivityIndicator color="#FFFFFF" /> : (
                        <>
                            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
                            <Text style={styles.salvarText}>{isEditing ? 'Salvar alterações' : 'Cadastrar vínculo'}</Text>
                        </>
                    )}
                </Pressable>

                <Text style={styles.requiredText}>* Campos obrigatórios</Text>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    conteudo: {
        paddingHorizontal: 23,
        paddingTop: 20,
        paddingBottom: 45,
    },

    center: {
        flex: 1,
        backgroundColor: '#FFF7F1',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        padding: 25,
    },

    returnButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        marginBottom: 12,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 7,
    },

    subtitulo: {
        fontSize: 14,
        color: '#30212A',
        lineHeight: 21,
        marginBottom: 25,
    },

    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#542039',
        marginBottom: 9,
        marginTop: 17,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#E8D9D7',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 14,
        color: '#30212A',
    },

    opcoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 9,
    },

    opcao: {
        paddingHorizontal: 15,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: '#E8D9D7',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },

    opcaoSelected: {
        backgroundColor: '#542039',
        borderColor: '#542039',
    },

    opcaoText: {
        fontSize: 13,
        color: '#30212A',
        fontWeight: '600',
    },

    opcaoTextSelected: {
        color: '#FFFFFF',
    },

    error: {
        color: '#B42318',
        fontSize: 12,
        marginTop: 5,
    },

    salvarButton: {
        height: 54,
        backgroundColor: '#542039',
        borderRadius: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        marginTop: 35,
    },

    disabledButton: {
        opacity: 0.65,
    },

    salvarText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    ajudaText: {
        fontSize: 14,
        color: '#30212A',
        textAlign: 'center',
    },

    retryText: {
        color: '#8D4059',
        fontWeight: '700',
    },

    requiredText: {
        fontSize: 12,
        color: '#806F76',
        textAlign: 'center',
        marginTop: 15,
    },

});

