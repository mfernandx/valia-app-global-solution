
import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline';
    icon?: IconName;
    loading?: boolean;
    disabled?: boolean;
}

export default function AppButton({title,onPress,variant = 'primary',icon,loading = false,disabled = false}: AppButtonProps) {
    
    const isPrimary = variant === 'primary';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            accessibilityRole="button"
            accessibilityState={{
                disabled: disabled || loading,
                busy: loading,
            }}
            style={({ pressed }) => [
                styles.button,
                isPrimary ? styles.primary : styles.outline,
                (disabled || loading) && styles.disabled,
                pressed && styles.pressed,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#542039'}/>
            ) : (
                <View style={styles.conteudo}>
                    {icon && !isPrimary && (
                        <Ionicons
                            name={icon}
                            size={21}
                            color="#542039"
                            style={styles.leftIcon}
                        />
                    )}

                    <Text style={[styles.text, isPrimary ? styles.primaryText : styles.outlineText]}>
                        {title}
                    </Text>

                    {icon && isPrimary && (
                        <Ionicons name={icon} size={23} color="#FFFFFF" style={styles.rightIcon}/>
                    )}
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 52,
        width: '100%',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    primary: {
        backgroundColor: '#812443',
    },

    outline: {
        borderWidth: 1.2,
        borderColor: '#542039',
        backgroundColor: 'rgba(255,247,241,0.65)',
    },

    disabled: {
        opacity: 0.55,
    },

    pressed: {
        opacity: 0.85,
    },

    conteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: '700',
    },

    primaryText: {
        color: '#FFFFFF',
    },

    outlineText: {
        color: '#542039',
    },

    leftIcon: {
        marginRight: 10,
    },

    rightIcon: {
        marginLeft: 18,
    },
});
