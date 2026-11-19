import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { communityPostService } from '../../services/communityPostService';
import { COMMUNITY_CATEGORIES, getCommunityCategoryLabel } from '../../utils/communityCategory';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import CommunityPostCard from '../../components/community/CommunityPostCard';

export default function CommunityScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const { data: posts = [], isLoading, isError, isRefetching, refetch } = useQuery({
        queryKey: ['communityPosts'],
        queryFn: communityPostService.getAll,
    });

    const filteredPosts = useMemo(() => {
        if (selectedCategory === null) return posts;

        return posts.filter(post => {

            const category = typeof post.category === 'number' ? post.category : Number(post.category);

            if (!Number.isNaN(category)) return category === selectedCategory;

            return getCommunityCategoryLabel(post.category) === getCommunityCategoryLabel(selectedCategory);
        });

    }, [posts, selectedCategory]);

    const categories = [{ value: null, label: 'Todas' }, ...COMMUNITY_CATEGORIES];

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <FlatList
                data={filteredPosts}
                keyExtractor={item => item.communityPostId}
                renderItem={({ item }) => <CommunityPostCard post={item} />}
                contentContainerStyle={styles.conteudo}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={() => { void refetch(); }}
                        tintColor="#8D4059"
                        colors={['#8D4059']}
                    />
                }
                ListHeaderComponent={
                    <>
                        <View style={styles.tituloRow}>

                            <View style={styles.tituloConteudo}>
                                <Text style={styles.titulo}>Comunidade</Text>
                                <Text style={styles.subtitulo}>Um espaço para compartilhar e aprender.</Text>
                            </View>

                            <View style={styles.headerIcon}>
                                <Ionicons name="people-outline" size={27} color="#8D4059" />
                            </View>

                        </View>

                        <View style={styles.welcomeCard}>

                            <Text style={styles.welcomeTitulo}>Sua voz tem espaço aqui.</Text>
                            <Text style={styles.welcomeText}>Compartilhe experiências, tire dúvidas e troque conhecimentos sobre o mundo do trabalho.</Text>

                            <Pressable style={styles.criarButton} onPress={() => navigation.navigate('CreateCommunityPost')}>
                                <Ionicons name="add" size={21} color="#FFFFFF" />
                                <Text style={styles.criarButtonText}>Nova publicação</Text>
                            </Pressable>

                        </View>

                        <Text style={styles.sectionTitulo}>Explorar publicações</Text>

                        <View style={styles.categoriasContainer}>
                            
                            {categories.map(category => (
                                <Pressable
                                    key={category.value ?? 'all'}
                                    style={[
                                        styles.categoriaFiltro,
                                        selectedCategory === category.value && styles.categoriaFiltroSelected,
                                    ]}
                                    onPress={() => setSelectedCategory(category.value)}
                                >
                                    <Text style={[styles.categoriaFiltroText, selectedCategory === category.value && styles.categoriaFiltroTextSelected]}>{category.label}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        {isLoading ? (
                            <>
                                <ActivityIndicator size="large" color="#8D4059" />
                                <Text style={styles.emptyText}>Carregando publicações...</Text>
                            </>
                        ) : isError ? (
                            <>
                                <Ionicons name="cloud-offline-outline" size={42} color="#8D4059" />
                                <Text style={styles.emptyTitulo}>Não foi possível carregar o feed</Text>
                                <Text style={styles.emptyText}>Verifique sua conexão e tente novamente.</Text>

                                <Pressable style={styles.retryButton} onPress={() => { void refetch(); }}>
                                    <Text style={styles.retryButtonText}>Tentar novamente</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Ionicons name="chatbubbles-outline" size={43} color="#8D4059" />

                                <Text style={styles.emptyTitulo}>
                                    {selectedCategory === null ? 'Nenhuma publicação ainda' : 'Nenhuma publicação nesta categoria'}
                                </Text>

                                <Text style={styles.emptyText}>
                                    {selectedCategory === null ? 'A comunidade está esperando pela primeira publicação.' : 'Experimente selecionar outra categoria.'}
                                </Text>
                            </>
                        )}
                    </View>
                }
                ListFooterComponent={<Text style={styles.footerText}>Um espaço de respeito, troca e acolhimento.</Text>}
            />
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    conteudo: {
        paddingHorizontal: 23,
        paddingBottom: 40,
    },

    tituloRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 23,
    },

    tituloConteudo: {
        flex: 1,
        paddingRight: 12,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 5,
    },

    subtitulo: {
        fontSize: 14,
        color: '#30212A',
        lineHeight: 20,
    },

    headerIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcomeCard: {
        backgroundColor: '#542039',
        borderRadius: 20,
        padding: 21,
        marginBottom: 28,
    },

    welcomeTitulo: {
        fontSize: 19,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 9,
    },

    welcomeText: {
        fontSize: 13,
        color: '#F9E6DF',
        lineHeight: 20,
        marginBottom: 20,
    },

    criarButton: {
        backgroundColor: '#D76D45',
        borderRadius: 12,
        paddingVertical: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    criarButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    sectionTitulo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 15,
    },

    categoriasContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 9,
        marginBottom: 22,
    },

    categoriaFiltro: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F0DDD7',
        borderRadius: 22,
        paddingHorizontal: 15,
        paddingVertical: 9,
    },

    categoriaFiltroSelected: {
        backgroundColor: '#542039',
        borderColor: '#542039',
    },

    categoriaFiltroText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#542039',
    },

    categoriaFiltroTextSelected: {
        color: '#FFFFFF',
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 45,
        paddingHorizontal: 15,
        gap: 10,
    },

    emptyTitulo: {
        fontSize: 16,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
    },

    emptyText: {
        fontSize: 13,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 19,
    },

    retryButton: {
        backgroundColor: '#542039',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 8,
    },

    retryButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    footerText: {
        fontSize: 12,
        color: '#806F76',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 10,
    },
});


