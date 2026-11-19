import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { communityPostService } from '../../services/communityPostService';
import { communityCommentService } from '../../services/communityCommentService';
import { getCommunityCategoryLabel } from '../../utils/communityCategory';
import CommunityCommentCard from '../../components/community/CommunityCommentCard';

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

export default function CommunityPostDetailsScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'CommunityPostDetails'>>();
    const insets = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const { postId } = route.params;
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const postQuery = useQuery({
        queryKey: ['communityPost', postId],
        queryFn: () => communityPostService.getById(postId),
    });

    const commentsQuery = useQuery({
        queryKey: ['communityComments', postId],
        queryFn: () => communityCommentService.getByPostId(postId),
    });

    const createCommentMutation = useMutation({

        mutationFn: communityCommentService.create,
        onSuccess: async () => {
            setContent('');
            setIsAnonymous(false);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['communityComments', postId] }),
                queryClient.invalidateQueries({ queryKey: ['communityPost', postId] }),
                queryClient.invalidateQueries({ queryKey: ['communityPosts'] }),
            ]);
        },
        onError: () => Alert.alert('Erro', 'Não foi possível enviar o comentário. Tente novamente.'),
    });

    const deletePostMutation = useMutation({

        mutationFn: () => communityPostService.remove(postId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
            navigation.goBack();
        },
        onError: () => {
            Alert.alert('Erro', 'Não foi possível excluir a publicação. Tente novamente.');
        },

    });

    function confirmDeletePost() {

        Alert.alert(
            'Excluir publicação',
            'Tem certeza de que deseja excluir esta publicação? Essa ação não poderá ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => deletePostMutation.mutate(),
                },
            ]
        );
    }

    function submitComment() {
        const trimmedContent = content.trim();

        if (!trimmedContent) {
            Alert.alert('Atenção', 'Escreva um comentário antes de enviar.');
            return;
        }

        if (trimmedContent.length > 2000) {
            Alert.alert('Atenção', 'O comentário deve ter no máximo 2000 caracteres.');
            return;
        }

        createCommentMutation.mutate({
            communityPostId: postId,
            content: trimmedContent,
            isAnonymous,
        });
    }

    const post = postQuery.data;
    const comments = commentsQuery.data ?? [];

    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            
            <FlatList
                data={comments}
                keyExtractor={item => item.communityCommentId}
                renderItem={({ item }) => <CommunityCommentCard comment={item} />}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + 12 }]}
                ListHeaderComponent={
                    <>
                        <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={23} color="#542039" />
                        </Pressable>

                        {postQuery.isPending ? (

                            <ActivityIndicator size="large" color="#8D4059" style={styles.loader} />

                        ) : postQuery.isError || !post ? (

                            <View style={styles.feedback}>

                                <Text style={styles.feedbackText}>Não foi possível carregar a publicação.</Text>

                                <Pressable onPress={() => { void postQuery.refetch(); }}>
                                    <Text style={styles.retryText}>Tentar novamente</Text>
                                </Pressable>

                            </View>

                        ) : (

                            <View style={styles.postCard}>

                                <View style={styles.postHeader}>

                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>
                                            {post.isAnonymous ? '?' : post.authorName.charAt(0).toUpperCase() || 'U'}
                                        </Text>
                                    </View>

                                    <View style={styles.autorInfo}>
                                        <Text style={styles.autorNome}>{post.authorName}</Text>
                                        <Text style={styles.data}>{formatDate(post.createdAt)}</Text>
                                    </View>

                                </View>

                                <View style={styles.categoriaBadge}>
                                    <Text style={styles.categoriaText}>{getCommunityCategoryLabel(post.category)}</Text>
                                </View>

                                {post.isOwner && (
                                    <Pressable
                                        style={styles.deletarButton}
                                        onPress={confirmDeletePost}
                                        disabled={deletePostMutation.isPending}
                                    >
                                        {deletePostMutation.isPending ? (
                                            <ActivityIndicator size="small" color="#C05745" />
                                        ) : (
                                            <Ionicons name="trash-outline" size={17} color="#C05745" />
                                        )}
                                        <Text style={styles.deletarButtonText}>Excluir publicação</Text>
                                    </Pressable>
                                )}

                                <Text style={styles.postTitulo}>{post.title}</Text>
                                <Text style={styles.postConteudo}>{post.content}</Text>

                                <View style={styles.postFooter}>

                                    <Ionicons name="chatbubble-outline" size={18} color="#8D4059" />
                                    <Text style={styles.contadorComentarios}>
                                        {post.commentCount} {post.commentCount === 1 ? 'comentário' : 'comentários'}
                                    </Text>

                                </View>
                            </View>
                        )}

                        {!postQuery.isPending && !postQuery.isError && post && (
                            <>
                                <Text style={styles.sectionTitulo}>Comentários ({post.commentCount})</Text>

                                {commentsQuery.isPending && (
                                    <ActivityIndicator size="small" color="#8D4059" style={styles.loader} />
                                )}

                                {commentsQuery.isError && (
                                    <View style={styles.feedback}>
                                        <Text style={styles.feedbackText}>Não foi possível carregar os comentários.</Text>
                                        <Pressable onPress={() => { void commentsQuery.refetch(); }}>
                                            <Text style={styles.retryText}>Tentar novamente</Text>
                                        </Pressable>
                                    </View>
                                )}

                                {commentsQuery.isSuccess && comments.length === 0 && (
                                    <Text style={styles.emptyText}>Ainda não há comentários. Seja a primeira pessoa a responder!</Text>
                                )}
                            </>
                        )}
                    </>
                }

                ListFooterComponent={
                    post && !postQuery.isError ? (

                        <View style={styles.formCard}>

                            <Text style={styles.formTitulo}>Deixe seu comentário</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Compartilhe sua opinião ou experiência..."
                                placeholderTextColor="#A49399"
                                multiline
                                textAlignVertical="top"
                                value={content}
                                onChangeText={setContent}
                                maxLength={2000}
                                editable={!createCommentMutation.isPending}
                            />

                            <Text style={styles.contagemCaracteres}>{content.length}/2000</Text>

                            <View style={styles.anonimoRow}>
                                <Ionicons name="eye-off-outline" size={20} color="#8D4059" />
                                <Text style={styles.anonimoText}>Comentar anonimamente</Text>
                                <Switch
                                    value={isAnonymous}
                                    onValueChange={setIsAnonymous}
                                    trackColor={{ false: '#E8D7D2', true: '#DDA6B6' }}
                                    thumbColor={isAnonymous ? '#8D4059' : '#FFFFFF'}
                                />
                            </View>

                            <Pressable
                                style={[styles.enviarButton, createCommentMutation.isPending && styles.disabledButton]}
                                onPress={submitComment}
                                disabled={createCommentMutation.isPending}
                            >
                                {createCommentMutation.isPending ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (

                                    <Ionicons name="send-outline" size={18} color="#FFFFFF" />

                                )}
                                <Text style={styles.enviarText}>
                                    {createCommentMutation.isPending ? 'Enviando...' : 'Enviar comentário'}
                                </Text>

                            </Pressable>

                        </View>

                    ) : undefined
                }
            />
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    conteudo: {
        paddingHorizontal: 23,
        paddingBottom: 45,
    },

    returnButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
    },

    loader: {
        marginVertical: 30,
    },

    feedback: {
        padding: 20,
        alignItems: 'center',
        gap: 12,
    },

    feedbackText: {
        fontSize: 13,
        color: '#806F76',
        textAlign: 'center',
    },

    retryText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#8D4059',
    },

    postCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 20,
        marginBottom: 27,
    },

    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
        marginBottom: 17,
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

    autorNome: {
        fontSize: 13,
        fontWeight: '800',
        color: '#542039',
    },

    data: {
        fontSize: 11,
        color: '#806F76',
        marginTop: 4,
    },

    categoriaBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF1EC',
        borderRadius: 8,
        paddingHorizontal: 11,
        paddingVertical: 7,
        marginBottom: 14,
    },

    categoriaText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#B85B3A',
    },

    proprietarioText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8D4059',
        marginBottom: 10,
    },

    postTitulo: {
        fontSize: 20,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 13,
    },

    postConteudo: {
        fontSize: 14,
        color: '#30212A',
        lineHeight: 23,
        marginBottom: 20,
    },

    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: '#F4EAE7',
        paddingTop: 15,
    },

    contadorComentarios: {
        fontSize: 12,
        color: '#806F76',
        fontWeight: '600',
    },

    sectionTitulo: {
        fontSize: 19,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 17,
    },

    emptyText: {
        fontSize: 13,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 25,
    },

    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 19,
        marginTop: 18,
    },

    formTitulo: {
        fontSize: 16,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 14,
    },

    input: {
        minHeight: 110,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        backgroundColor: '#FFF7F1',
        borderRadius: 12,
        padding: 14,
        fontSize: 13,
        color: '#30212A',
    },

    contagemCaracteres: {
        fontSize: 11,
        color: '#806F76',
        textAlign: 'right',
        marginTop: 7,
        marginBottom: 17,
    },

    anonimoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },

    anonimoText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
        color: '#542039',
    },

    enviarButton: {
        backgroundColor: '#D76D45',
        borderRadius: 12,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
    },

    disabledButton: {
        opacity: 0.65,
    },

    enviarText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    deletarButton: { 
        alignSelf: 'flex-start', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 7, 
        backgroundColor: '#FFF1EC', 
        borderRadius: 10, 
        paddingHorizontal: 12, 
        paddingVertical: 10, 
        marginBottom: 15 
    },

    deletarButtonText: { 
        fontSize: 12, 
        fontWeight: '700', 
        color: '#C05745' 
    },

});

