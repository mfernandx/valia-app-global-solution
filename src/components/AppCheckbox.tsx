
import {Pressable,StyleSheet,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppCheckboxProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
}

export default function AppCheckbox({checked, onChange, label}: AppCheckboxProps) {
    return (
        <Pressable
            onPress={() => onChange(!checked)}
            accessibilityRole="checkbox"
            accessibilityLabel={label}
            accessibilityState={{ checked }}
            style={styles.container}
        >
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && (
                    <Ionicons name="checkmark" size={15} color="#FFFFFF"/>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkbox: {
        width: 21,
        height: 21,
        borderWidth: 1.5,
        borderColor: '#542039',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    checked: {
        backgroundColor: '#812443',
        borderColor: '#812443',
    },
});
