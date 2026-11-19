import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Employment } from '../../models/employment';
import { getEmploymentTypeLabel } from '../../utils/employmentType';

interface Props {
    employment: Employment;
    onPress: () => void;
}

function formatDate(date: string | null) {
    if (!date) return 'Não informado';
    const [year, month, day] = date.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}

export default function EmploymentCard({ employment, onPress }: Props) {

    const isActive = !employment.terminationDate;

    return (
        <Pressable style={styles.card} onPress={onPress}>

            <View style={styles.header}>

                <View style={styles.iconContainer}>
                    <Ionicons name="briefcase-outline" size={24} color="#8D4059" />
                </View>

                <View style={styles.headerConteudo}>

                    <Text style={styles.jobTitulo} numberOfLines={2}>
                        {employment.jobTitle}
                    </Text>

                    <Text style={styles.tipoVinculo}>
                        {getEmploymentTypeLabel(employment.employmentType)}
                    </Text>

                </View>

                <Ionicons name="chevron-forward" size={20} color="#8D4059" />

            </View>

            <View style={styles.divisor} />

            <View style={styles.infoRow}>

                <Ionicons name="calendar-outline" size={17} color="#8D4059" />

                <Text style={styles.infoText}>Admissão: {formatDate(employment.admissionDate)}</Text>

            </View>

            {employment.terminationDate && (
                <View style={styles.infoRow}>

                    <Ionicons name="calendar-clear-outline" size={17} color="#8D4059" />
                    
                    <Text style={styles.infoText}>Desligamento: {formatDate(employment.terminationDate)}</Text>

                </View>
            )}

            {employment.professionalCategory && (
                <View style={styles.infoRow}>

                    <Ionicons name="people-outline" size={17} color="#8D4059" />
                    <Text style={styles.infoText}>{employment.professionalCategory}</Text>

                </View>
            )}

            <View style={styles.footer}>

                <View style={[styles.statusBadge, isActive ? styles.ativoBadge : styles.inativoBadge]}>
                    <View style={[styles.statusPonto, { backgroundColor: isActive ? '#387D65' : '#A65E49' }]} />
                    <Text style={[styles.statusText, { color: isActive ? '#387D65' : '#A65E49' }]}>{isActive ? 'Em andamento' : 'Encerrado'}</Text>
                </View>

                <Text style={styles.detalhesText}>Ver detalhes</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    card: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 18, 
        padding: 18, 
        borderWidth: 1, 
        borderColor: '#F0DDD7', 
        marginBottom: 13 
    },

    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 12 
    },

    iconContainer: { 
        width: 48, 
        height: 48, 
        borderRadius: 14, 
        backgroundColor: '#F9E6DF', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    headerConteudo: { 
        flex: 1 
    },

    jobTitulo: { 
        fontSize: 16, 
        fontWeight: '800', 
        color: '#542039' 
    },

    tipoVinculo: { 
        fontSize: 13, 
        color: '#806F76', 
        marginTop: 4 
    },

    divisor: { 
        height: 1, 
        backgroundColor: '#F0E2DF', 
        marginVertical: 15 
    },

    infoRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 9, 
        marginBottom: 9 
    },

    infoText: { 
        fontSize: 13, 
        color: '#51464A', 
        flex: 1 
    },

    footer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 8 
    },
    
    statusBadge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6, 
        paddingHorizontal: 10, 
        paddingVertical: 7, 
        borderRadius: 20 
    },
    
    ativoBadge: { 
        backgroundColor: '#E5F3EC' 
    },
    
    inativoBadge: { 
        backgroundColor: '#FBECE5' 
    },
    
    statusPonto: { 
        width: 7, 
        height: 7, 
        borderRadius: 4 
    },
    
    statusText: { 
        fontSize: 11, 
        fontWeight: '700' 
    },
    
    detalhesText: { 
        fontSize: 12, 
        color: '#8D4059', 
        fontWeight: '700' 
    },

});
