import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TimeInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function TimeInput({ label, value, onChange, error }: TimeInputProps) {
    
    function formatTime(text: string) {
        const digits = text.replace(/\D/g, '').slice(0, 4);
        return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
                <Ionicons name="time-outline" size={19} color="#8D4059" />
                <TextInput value={value} onChangeText={text => onChange(formatTime(text))} placeholder="HH:mm" placeholderTextColor="#8B747C" keyboardType="number-pad" maxLength={5} style={styles.input} />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({

    wrapper: { 
        width: '48.5%', 
        marginBottom: 14 
    },

    label: { 
        fontSize: 12, 
        fontWeight: '700', 
        color: '#542039', 
        marginBottom: 7 
    },

    inputContainer: { 
        minHeight: 52, 
        borderWidth: 1, 
        borderColor: '#DFC9C8', 
        borderRadius: 15, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 12, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8 
    },

    input: { 
        flex: 1, 
        fontSize: 14, 
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

});
