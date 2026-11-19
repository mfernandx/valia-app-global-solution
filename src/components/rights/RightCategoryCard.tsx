import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { LaborRightCategory } from '../../models/laborRights';

interface RightCategoryCardProps {
    category: LaborRightCategory;
    onPress: () => void;
}

export default function RightCategoryCard({ category, onPress }: RightCategoryCardProps) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={24} color="#8D4059" />
            </View>

            <View style={styles.conteudo}>
                <Text style={styles.titulo}>{category.title}</Text>
                <Text style={styles.descricao}>{category.description}</Text>
            </View>

            <Ionicons name="chevron-forward" size={19} color="#8D4059" />
        </Pressable>
    );
}


const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        marginBottom: 12,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    conteudo: {
        flex: 1,
        gap: 5,
    },

    titulo: {
        fontSize: 14,
        fontWeight: '800',
        color: '#542039',
    },

    descricao: {
        fontSize: 12,
        color: '#806F76',
        lineHeight: 18,
    },
});

