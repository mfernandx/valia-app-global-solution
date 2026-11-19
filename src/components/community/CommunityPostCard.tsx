import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CommunityPost } from '../../models/community';
import { getCommunityCategoryLabel } from '../../utils/communityCategory';

interface CommunityPostCardProps {
    post: CommunityPost;
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function CommunityPostCard({ post }: CommunityPostCardProps) {

    const authorInitial = post.isAnonymous ? '?' : post.authorName.trim().charAt(0).toUpperCase();

    return (
        <View style={styles.postCard}>

            <View style={styles.postHeader}>

                <View style={styles.autorAvatar}>
                    <Text style={styles.autorInicial}>{authorInitial || 'U'}</Text>
                </View>

                <View style={styles.autorInfo}>
                    <Text style={styles.autorNome}>{post.authorName}</Text>
                    <Text style={styles.postData}>{formatDate(post.createdAt)}</Text>
                </View>

                <View style={styles.categoriaBadge}>
                    <Text style={styles.categoriaBadgeText}>
                        {getCommunityCategoryLabel(post.category)}
                    </Text>
                </View>

            </View>

            {post.isOwner && (
                <View style={styles.proprietarioBadge}>
                    <Ionicons name="person-circle-outline" size={14} color="#8D4059" />
                    <Text style={styles.ownerBadgeText}>Minha publicação</Text>
                </View>
            )}

            <Text style={styles.postTitulo}>{post.title}</Text>
            <Text style={styles.postConteudo} numberOfLines={4}>{post.content}</Text>

            <View style={styles.postFooter}>

                <Ionicons name="chatbubble-outline" size={18} color="#8D4059" />

                <Text style={styles.contagemComentarios}>
                    {post.commentCount} {post.commentCount === 1 ? 'comentário' : 'comentários'}
                </Text>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    postCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 18,
        marginBottom: 15,
    },

    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },

    autorAvatar: {
        width: 41,
        height: 41,
        borderRadius: 21,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    autorInicial: {
        fontSize: 16,
        fontWeight: '800',
        color: '#8D4059',
    },

    autorInfo: {
        flex: 1,
    },

    autorNome: {
        fontSize: 13,
        fontWeight: '800',
        color: '#542039',
    },

    postData: {
        fontSize: 11,
        color: '#806F76',
        marginTop: 3,
    },

    categoriaBadge: {
        backgroundColor: '#FFF1EC',
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },

    categoriaBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#B85B3A',
    },

    proprietarioBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },

    ownerBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8D4059',
    },

    postTitulo: {
        fontSize: 16,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 8,
    },

    postConteudo: {
        fontSize: 13,
        color: '#30212A',
        lineHeight: 20,
        marginBottom: 16,
    },

    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: '#F4EAE7',
        paddingTop: 14,
    },

    contagemComentarios: {
        fontSize: 12,
        fontWeight: '600',
        color: '#806F76',
    },
});

