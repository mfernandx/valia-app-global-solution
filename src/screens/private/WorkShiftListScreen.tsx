import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import AppButton from '../../components/AppButton';
import EmploymentSelector from '../../components/workShift/EmploymentSelector';
import { employmentService } from '../../services/employmentService';
import { workShiftService } from '../../services/workShiftService';
import type { WorkShiftStackParamList } from '../../navigation/WorkShiftNavigator';

type NavigationProp = NativeStackNavigationProp<WorkShiftStackParamList, 'WorkShiftList'>;

export default function WorkShiftListScreen() {

    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const [employmentId, setEmploymentId] = useState('');

    const { data: employments = [], isLoading: loadingEmployments, isError: employmentError, refetch: refetchEmployments } = useQuery({
        queryKey: ['employments'],
        queryFn: employmentService.getAll,
    });

    const { data: shifts = [], isLoading: loadingShifts, isError: shiftsError, refetch: refetchShifts } = useQuery({
        queryKey: ['workShifts', employmentId],
        queryFn: () => workShiftService.getByEmployment(employmentId),
        enabled: !!employmentId,
    });

    function formatDateTime(value: string) {
        return new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo}>

                <Pressable onPress={() => navigation.getParent()?.goBack()} style={styles.returnButton}>
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Minhas jornadas</Text>
                <Text style={styles.subtitulo}>Acompanhe seus registros de trabalho.</Text>

                {loadingEmployments ? (

                    <ActivityIndicator color="#812443" />

                ) : employmentError ? (

                    <View style={styles.mensagemCard}>
                        <Text style={styles.mensagem}>Não foi possível carregar seus vínculos.</Text>
                        <AppButton title="Tentar novamente" onPress={() => { void refetchEmployments(); }} />
                    </View>

                ) : employments.length === 0 ? (

                    <View style={styles.mensagemCard}>
                        <Ionicons name="briefcase-outline" size={32} color="#8D4059" />
                        <Text style={styles.mensagem}>Você ainda não possui vínculos cadastrados. Será necessário cadastrar um vínculo para registrar jornadas.</Text>
                    </View>

                ) : (
                    <>
                        <EmploymentSelector employments={employments} value={employmentId} onChange={setEmploymentId} />

                        <AppButton title="Registrar nova jornada" icon="add-outline" onPress={() => navigation.navigate('CreateWorkShift')} />

                        {!employmentId ? (

                            <Text style={styles.seletor}>Selecione um vínculo para visualizar as jornadas.</Text>
                        
                        ) : loadingShifts ? (

                            <ActivityIndicator color="#812443" style={styles.loading} />

                        ) : shiftsError ? (

                            <View style={styles.mensagemCard}>
                                <Text style={styles.mensagem}>Não foi possível carregar as jornadas.</Text>
                                <AppButton title="Tentar novamente" onPress={() => { void refetchShifts(); }} />
                            </View>

                        ) : shifts.length === 0 ? (

                            <View style={styles.mensagemCard}>
                                <Ionicons name="calendar-outline" size={30} color="#8D4059" />
                                <Text style={styles.mensagem}>Nenhuma jornada registrada para este vínculo.</Text>
                            </View>

                        ) : (
                            <View style={styles.lista}>
                                <Text style={styles.sectionTitulo}>Histórico de jornadas</Text>

                                {[...shifts].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()).map(shift => (
                                    <View key={shift.workShiftId} style={styles.jornadaCard}>

                                        <View style={styles.jornadaHeader}>
                                            <Ionicons name="calendar-outline" size={20} color="#8D4059" />
                                            <Text style={styles.jornadaDate}>{formatDateTime(shift.startTime)}</Text>
                                        </View>

                                        <Text style={styles.jornadaText}>Saída: {formatDateTime(shift.endTime)}</Text>
                                        <Text style={styles.jornadaText}>Horas trabalhadas: {shift.workedHours.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} h</Text>
                                        {shift.notes && <Text style={styles.jornadaNotas}>{shift.notes}</Text>}
                                    
                                    </View>
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
        marginBottom: 25 
    },

    mensagemCard: { 
        backgroundColor: '#F9E6DF', 
        borderRadius: 16, 
        padding: 22, 
        alignItems: 'center', 
        gap: 14, 
        marginTop: 20 
    },
    
    mensagem: { 
        fontSize: 14, 
        color: '#542039', 
        textAlign: 'center', 
        lineHeight: 21 
    },
    
    seletor: { 
        fontSize: 13, 
        color: '#806F76', 
        textAlign: 'center', 
        marginTop: 25 
    },
    
    loading: { 
        marginTop: 25 
    },
    
    lista: { 
        marginTop: 28, 
        gap: 12 
    },
    
    sectionTitulo: { 
        fontSize: 18, 
        fontWeight: '800', 
        color: '#542039', 
        marginBottom: 3 
    },
    
    jornadaCard: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        padding: 16 
    },
    
    jornadaHeader: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 9, 
        marginBottom: 9 
    },
    
    jornadaDate: { 
        fontSize: 15, 
        fontWeight: '700', 
        color: '#542039' 
    },
    
    jornadaText: { 
        fontSize: 13, 
        color: '#30212A', 
        marginBottom: 5 
    },
    
    jornadaNotas: { 
        fontSize: 12, 
        color: '#806F76', 
        marginTop: 7 
    },
});
