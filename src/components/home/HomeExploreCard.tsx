import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeExploreCardProps {
    title: string;
    description: string;
    actionLabel: string;
    icon: keyof typeof Ionicons.glyphMap;
    backgroundColor: string;
    iconColor: string;
    onPress: () => void;
}

export default function HomeExploreCard({ title, description, actionLabel, icon, backgroundColor, iconColor, onPress }: HomeExploreCardProps) {

    return (

        <Pressable
            style={[styles.card, { backgroundColor }]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
        >
            <View style={styles.conteudo}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={24} color={iconColor} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.descricao}>{description}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={[styles.acaoLabel, { color: iconColor }]}>{actionLabel}</Text>
                <Ionicons name="arrow-forward" size={18} color={iconColor} />
            </View>

        </Pressable>
    );
}


const styles = StyleSheet.create({

    card: {
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0DDD7',
    },

    conteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        marginBottom: 17,
    },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textContainer: {
        flex: 1,
        gap: 6,
    },

    titulo: {
        fontSize: 14,
        fontWeight: '800',
        color: '#542039',
    },

    descricao: {
        fontSize: 12,
        color: '#806F76',
        lineHeight: 19,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 63,
    },

    acaoLabel: {
        fontSize: 12,
        fontWeight: '800',
    },
});
