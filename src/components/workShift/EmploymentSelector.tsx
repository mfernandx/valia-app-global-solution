import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { EmploymentResponse } from '../../models/employment';

interface EmploymentSelectorProps {
    employments: EmploymentResponse[];
    value: string;
    onChange: (id: string) => void;
    error?: string;
}

export default function EmploymentSelector({ employments, value, onChange, error }: EmploymentSelectorProps) {
    
    const [visible, setVisible] = useState(false);
    const selected = employments.find(item => item.employmentId === value);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>Vínculo profissional</Text>

            <Pressable onPress={() => setVisible(true)} style={[styles.selector, error ? styles.errorBorder : null]}>
                <Ionicons name="briefcase-outline" size={20} color="#8D4059" />
                <Text style={[styles.selectedText, !selected && styles.placeholder]} numberOfLines={1}>
                    {selected?.jobTitle || 'Selecione um vínculo'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#8D4059" />
            </Pressable>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitulo}>Selecione seu vínculo</Text>
                        <FlatList
                            data={employments}
                            keyExtractor={item => item.employmentId}
                            renderItem={({ item }) => (
                                <Pressable style={styles.opcao} onPress={() => { onChange(item.employmentId); setVisible(false); }}>
                                    <Text style={styles.opcaoTitulo}>{item.jobTitle}</Text>
                                    <Text style={styles.opcaoSubtitulo}>{item.professionalCategory || 'Vínculo profissional'}</Text>
                                </Pressable>
                            )}
                            ListEmptyComponent={<Text style={styles.empty}>Nenhum vínculo cadastrado.</Text>}
                        />
                        <Pressable onPress={() => setVisible(false)} style={styles.fecharButton}>
                            <Text style={styles.fecharText}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    wrapper: { 
        marginBottom: 15 
    },

    label: { 
        fontSize: 13, 
        fontWeight: '700', 
        color: '#542039', 
        marginBottom: 7 
    },

    selector: { 
        minHeight: 53, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        borderRadius: 15, 
        paddingHorizontal: 14, 
        backgroundColor: '#FFFFFF', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10 
    },

    selectedText: { 
        flex: 1, 
        fontSize: 14, 
        color: '#30212A' 
    },

    placeholder: { 
        color: '#8B747C' 
    },

    errorBorder: { 
        borderColor: '#B3261E' 
    },

    errorText: { 
        fontSize: 12, 
        color: '#B3261E', 
        marginTop: 5 
    },

    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.45)', 
        justifyContent: 'center', 
        padding: 25 
    },
    
    modal: { 
        backgroundColor: '#FFF7F1', 
        borderRadius: 20, 
        padding: 20, 
        maxHeight: '70%' 
    },
    
    modalTitulo: { 
        fontSize: 19, 
        fontWeight: '800', 
        color: '#542039', 
        marginBottom: 15 
    },
    
    opcao: { 
        paddingVertical: 14, 
        borderBottomWidth: 1, 
        borderBottomColor: '#EAD8D3' 
    },
    
    opcaoTitulo: { 
        fontSize: 15, 
        fontWeight: '700', 
        color: '#30212A' 
    },
    
    opcaoSubtitulo: { 
        fontSize: 12, 
        color: '#8B747C', 
        marginTop: 3 
    },
    
    empty: { 
        textAlign: 'center', 
        color: '#8B747C', 
        marginVertical: 20 
    },
    
    fecharButton: { 
        alignItems: 'center', 
        padding: 14, 
        marginTop: 10 
    },
    
    fecharText: { 
        color: '#812443', 
        fontWeight: '700' 
    },

});
