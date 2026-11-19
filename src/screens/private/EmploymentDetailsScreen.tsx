import React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { employmentService } from '../../services/employmentService';
import { getEmploymentTypeLabel } from '../../utils/employmentType';
import type { EmploymentStackParamList } from '../../navigation/EmploymentNavigator';

type ScreenProps = NativeStackScreenProps<EmploymentStackParamList, 'EmploymentDetails'>;

function formatDate(date?: string | null) {
    if (!date) return 'Não informado';

    const [year, month, day] = date.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}

function formatCurrency(value?: number | null) {
    if (value === null || value === undefined) return 'Não informado';

    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function getErrorMessage(error: unknown) {
    
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as {
            detail?: string;
            title?: string;
            message?: string;
        } | undefined;

        if (error.response?.status === 409) {
            return data?.detail ?? data?.message ??
                'Este vínculo possui registros associados e não pode ser excluído.';
        }

        return data?.detail ?? data?.message ?? data?.title ??
            'Não foi possível excluir o vínculo.';
    }

    return 'Ocorreu um erro inesperado. Tente novamente.';
}

interface DetailRowProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    label: string;
    value: string;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
    return (
        <View style={styles.detalheRow}>

            <View style={styles.detalheIcon}>
                <Ionicons name={icon} size={19} color={'#8D4059'} />
            </View>

            <View style={styles.detalheConteudo}>
                <Text style={styles.detalheLabel}>{label}</Text>
                <Text style={styles.detalheValor}>{value}</Text>
            </View>

        </View>
    );
}

export default function EmploymentDetailsScreen() {

    const navigation = useNavigation<ScreenProps['navigation']>();
    const route = useRoute<ScreenProps['route']>();
    const queryClient = useQueryClient();
    const insets = useSafeAreaInsets();
    const { employmentId } = route.params;
    const { data: employment, isLoading, isError, refetch } = useQuery({
        queryKey: ['employment', employmentId],
        queryFn: () => employmentService.getById(employmentId),
    });

    const deleteMutation = useMutation({

        mutationFn: () => employmentService.remove(employmentId),
        onSuccess: async () => {

            await queryClient.invalidateQueries({ queryKey: ['employments'] });
            queryClient.removeQueries({ queryKey: ['employment', employmentId] });

            Alert.alert('Vínculo excluído', 'O vínculo profissional foi excluído com sucesso.', [
                { text: 'OK', onPress: () => navigation.popToTop() },
            ]);

        },
        onError: error => {
            Alert.alert('Não foi possível excluir', getErrorMessage(error));
        },
        
    });

    function confirmDelete() {
        Alert.alert(
            'Excluir vínculo?',
            'Esta ação é permanente. O vínculo só poderá ser excluído se não houver jornadas, ocorrências, avaliações ou evidências associadas.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => deleteMutation.mutate(),
                },
            ]
        );
    }

    if (isLoading) {
        return (

            <View style={styles.center}>
                <ActivityIndicator size="large" color={'#8D4059'} />
                <Text style={styles.ajudaText}>Carregando vínculo...</Text>
            </View>

        );
    }

    if (isError || !employment) {
        return (

            <View style={styles.center}>

                <Ionicons name="alert-circle-outline" size={38} color={'#8D4059'} />
                
                <Text style={styles.ajudaText}>Não foi possível carregar os detalhes do vínculo.</Text>
                
                <Pressable style={styles.retryButton} onPress={() => { void refetch(); }}>
                    <Text style={styles.retryText}>Tentar novamente</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.returnText}>Voltar</Text>
                </Pressable>

            </View>

        );
    }

    const isActive = !employment.terminationDate;

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo}>

                <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={'#542039'} />
                </Pressable>

                <Text style={styles.titulo}>Detalhes do vínculo</Text>
                <Text style={styles.subtitulo}>Consulte e gerencie suas informações profissionais.</Text>

                <View style={styles.headerCard}>

                    <View style={styles.headerIcon}>
                        <Ionicons name="briefcase-outline" size={28} color={'#8D4059'} />
                    </View>

                    <Text style={styles.tituloTrabalho}>{employment.jobTitle}</Text>
                    <Text style={styles.tipoVinculo}>{getEmploymentTypeLabel(employment.employmentType)}</Text>

                    <View style={[styles.statusBadge, isActive ? styles.ativoBadge : styles.inativoBadge]}>
                        
                        <View style={[styles.statusPonto, { backgroundColor: isActive ? '#387D65' : '#A65E49' }]} />
                        <Text style={[styles.statusText, { color: isActive ? '#387D65' : '#A65E49' }]}>{isActive ? 'Em andamento' : 'Encerrado'}</Text>
                    </View>

                </View>

                <Text style={styles.sectionTitulo}>Informações do vínculo</Text>

                <View style={styles.detalhesCard}>~

                    <DetailRow icon="briefcase-outline" label="Cargo ou função" value={employment.jobTitle} />
                    <DetailRow icon="document-text-outline" label="Tipo de contratação" value={getEmploymentTypeLabel(employment.employmentType)} />
                    <DetailRow icon="calendar-outline" label="Data de admissão" value={formatDate(employment.admissionDate)} />
                    <DetailRow icon="calendar-clear-outline" label="Data de desligamento" value={employment.terminationDate ? formatDate(employment.terminationDate) : 'Vínculo em andamento'} />
                    <DetailRow icon="cash-outline" label="Salário-base" value={formatCurrency(employment.baseSalary)} />
                    <DetailRow icon="time-outline" label="Carga horária semanal" value={employment.weeklyWorkload == null ? 'Não informado' : `${employment.weeklyWorkload} horas`} />
                    <DetailRow icon="people-outline" label="Categoria profissional" value={employment.professionalCategory || 'Não informado'} />
                
                </View>

                <Text style={styles.sectionTitulo}>Gerenciar vínculo</Text>

                <Pressable style={styles.editarButton} onPress={() => navigation.navigate('EmploymentForm', { employmentId })} disabled={deleteMutation.isPending}>
                    <Ionicons name="create-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.editarButtonText}>Editar vínculo</Text>
                </Pressable>

                <Pressable
                    style={[styles.deletarButton, deleteMutation.isPending && styles.disabledButton]}
                    onPress={confirmDelete}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? (

                        <ActivityIndicator color={'#D76D45'} />

                    ) : (
                        <>
                            <Ionicons name="trash-outline" size={20} color={'#D76D45'} />
                            <Text style={styles.deletarButtonText}>Excluir vínculo</Text>
                        </>
                    )}
                </Pressable>

                <Text style={styles.deletarNota}>A exclusão não será permitida se existirem jornadas, ocorrências, avaliações ou evidências associadas a este vínculo.</Text>
            
            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    conteudo: {
        paddingHorizontal: 23,
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
        marginBottom: 10,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 6,
    },

    subtitulo: {
        fontSize: 14,
        color: '#30212A',
        marginBottom: 25,
    },

    headerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0DDD7',
        marginBottom: 27,
    },

    headerIcon: {
        width: 60,
        height: 60,
        borderRadius: 18,
        backgroundColor: '#F9E6DF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 13,
    },

    tituloTrabalho: {
        fontSize: 20,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
    },

    tipoVinculo: {
        fontSize: 14,
        color: '#806F76',
        marginTop: 6,
    },

    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 16,
    },

    ativoBadge: {
        backgroundColor: '#E5F3EC',
    },

    inativoBadge: {
        backgroundColor: '#FBECE5',
    },

    statusPonto: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },

    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },

    sectionTitulo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 15,
    },

    detalhesCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        marginBottom: 28,
    },

    detalheRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F4EAE7',
    },

    detalheIcon: {
        width: 39,
        height: 39,
        borderRadius: 11,
        backgroundColor: '#FFF1EC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    detalheConteudo: {
        flex: 1,
    },

    detalheLabel: {
        fontSize: 12,
        color: '#806F76',
        marginBottom: 4,
    },

    detalheValor: {
        fontSize: 14,
        color: '#30212A',
        fontWeight: '600',
    },

    editarButton: {
        height: 54,
        borderRadius: 13,
        backgroundColor: '#542039',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        marginBottom: 12,
    },

    editarButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    deletarButton: {
        height: 54,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#D76D45',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
    },

    deletarButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#D76D45',
    },

    disabledButton: {
        opacity: 0.6,
    },

    deletarNota: {
        fontSize: 12,
        color: '#806F76',
        lineHeight: 18,
        textAlign: 'center',
        marginTop: 15,
    },

    ajudaText: {
        fontSize: 14,
        color: '#30212A',
        textAlign: 'center',
    },

    retryButton: {
        backgroundColor: '#542039',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },

    retryText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },

    returnText: {
        color: '#8D4059',
        fontWeight: '700',
    },

});

