import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface AnalysisSummaryCardProps {
    title: string;
    value: string;
    icon: IconName;
}

export default function AnalysisSummaryCard({ title, value, icon }: AnalysisSummaryCardProps) {
    return (
        <View style={styles.card}>
            <Ionicons name={icon} size={25} color="#8D4059" />
            <Text style={styles.valor}>{value}</Text>
            <Text style={styles.titulo}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    card: { 
        width: '48.5%', 
        minHeight: 125, 
        backgroundColor: '#F9E6DF', 
        borderRadius: 16, 
        padding: 15, 
        justifyContent: 'space-between' 
    },

    valor: { 
        fontSize: 23, 
        fontWeight: '800', 
        color: '#542039', 
        marginTop: 9 
    },

    titulo: { 
        fontSize: 12, 
        fontWeight: '600', 
        color: '#542039', 
        marginTop: 5 
    },

});
