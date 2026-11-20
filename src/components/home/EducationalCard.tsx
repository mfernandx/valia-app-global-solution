import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EducationalCardProps {
    title: string;
    onPress: () => void;
}

export default function EducationalCard({ title, onPress }: EducationalCardProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]} accessibilityRole="button">
            
            <View style={styles.thumbnail}>
                <Ionicons name="book-outline" size={27} color="#812443" />
            </View>

            <Text style={styles.titulo} numberOfLines={2}>{title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#30212A" />

        </Pressable>
    );
}

const styles = StyleSheet.create({

    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFF7F1', 
        borderRadius: 13, 
        padding: 7, 
        minHeight: 61, 
        borderWidth: 1, 
        borderColor: '#F1DDD7', 
        gap: 12,
        marginBottom: 10, 

    },

    thumbnail: { 
        width: 51, 
        height: 49, 
        borderRadius: 9, 
        backgroundColor: '#F3D4C9', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    titulo: { 
        flex: 1, 
        fontSize: 12, 
        fontWeight: '700', 
        color: '#30212A' },

    pressed: { 
        opacity: 0.75 
    },
});
