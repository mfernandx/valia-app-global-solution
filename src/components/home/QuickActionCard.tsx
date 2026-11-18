
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface QuickActionCardProps {
    title: string;
    icon: IconName;
    onPress: () => void;
}

export default function QuickActionCard({ title, icon, onPress }: QuickActionCardProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel={title}>
            <Ionicons name={icon} size={26} color="#9B344E" />
            <Text style={styles.titulo}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: { 
        width: '48.5%', 
        minHeight: 95, 
        borderRadius: 15, 
        backgroundColor: '#F9E6DF', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 12, 
        gap: 8 },

    titulo: { 
        fontSize: 13, 
        fontWeight: '600', 
        color: '#30212A', 
        textAlign: 'center' 
    },

    pressed: { 
        opacity: 0.75 
    },
});
