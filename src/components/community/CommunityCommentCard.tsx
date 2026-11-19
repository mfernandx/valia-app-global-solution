import { StyleSheet, Text, View } from 'react-native';
import type { CommunityComment } from '../../models/community';

interface CommunityCommentCardProps {
    comment: CommunityComment;
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function CommunityCommentCard({ comment }: CommunityCommentCardProps) {

    const authorInitial = comment.isAnonymous ? '?' : comment.authorName.trim().charAt(0).toUpperCase() || 'U';

    return (
        <View style={styles.comentarioCard}>

            <View style={styles.comentarioHeader}>
                
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{authorInitial}</Text>
                </View>

                <View style={styles.autorInfo}>
                    <Text style={styles.nomeAutor}>{comment.authorName}</Text>
                    <Text style={styles.data}>{formatDate(comment.createdAt)}</Text>
                </View>

                {comment.isOwner && (
                    <View style={styles.proprietarioBadge}>
                        <Text style={styles.proprietarioLabel}>Você</Text>
                    </View>
                )}
            </View>

            <Text style={styles.conteudoComentario}>{comment.content}</Text>

        </View>
    );
}


const styles = StyleSheet.create({

    comentarioCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 17,
        marginBottom: 12,
    },
    
    comentarioHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 17,
        fontWeight: '800',
        color: '#8D4059',
    },

    autorInfo: {
        flex: 1,
    },

    nomeAutor: {
        fontSize: 13,
        fontWeight: '800',
        color: '#542039',
    },

    data: {
        fontSize: 11,
        color: '#806F76',
        marginTop: 4,
    },

    proprietarioBadge: {
        backgroundColor: '#F9E6DF',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    proprietarioLabel: {
        fontSize: 11,
        color: '#8D4059',
        fontWeight: '700',
    },

    conteudoComentario: {
        fontSize: 13,
        color: '#30212A',
        lineHeight: 21,
    },

});
