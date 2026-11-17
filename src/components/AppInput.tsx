import React, { useState } from 'react';
import {View, Text, TextInput, TextInputProps, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface AppInputProps extends TextInputProps {
    icon: IconName;
    error?: string;
    isPassword?: boolean;
}

export default function AppInput({icon, error, isPassword = false, secureTextEntry,...props}: AppInputProps) {
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const shouldHidePassword = isPassword ? !passwordVisible : secureTextEntry;

    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                <Ionicons name={icon} size={21} color="#542039" style={styles.icon}/>

                <TextInput
                    {...props}
                    style={styles.input}
                    placeholderTextColor="#8B747C"
                    secureTextEntry={shouldHidePassword}
                    autoCapitalize={props.autoCapitalize ?? 'none'}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        accessibilityRole="button"
                        accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                        style={styles.visibilidadeButton}
                    >
                        <Ionicons
                            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                            size={21}
                            color="#542039"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 12,
    },

    inputContainer: {
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DFC9C8',
        borderRadius: 28,
        backgroundColor: 'rgba(255,247,241,0.85)',
        paddingHorizontal: 17,
    },

    inputError: {
        borderColor: '#B3261E',
    },

    icon: {
        marginRight: 13,
    },

    input: {
        flex: 1,
        minHeight: 50,
        fontSize: 15,
        color: '#30212A',
        paddingVertical: 0,
    },

    visibilidadeButton: {
        padding: 8,
        marginRight: -8,
    },

    errorText: {
        fontSize: 12,
        color: '#B3261E',
        marginTop: 5,
        marginLeft: 15,
    },
});
