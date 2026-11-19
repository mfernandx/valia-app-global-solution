import { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { laborRights } from '../../data/laborRights';
import RightCategoryCard from '../../components/rights/RightCategoryCard';

export default function RightsScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [search, setSearch] = useState('');

    const filteredRights = useMemo(() => {
        const term = search.trim().toLocaleLowerCase('pt-BR');

        if (!term) return laborRights;

        return laborRights.filter(category =>
            category.title.toLocaleLowerCase('pt-BR').includes(term) ||
            category.description.toLocaleLowerCase('pt-BR').includes(term) ||
            category.sections.some(section =>
                section.title.toLocaleLowerCase('pt-BR').includes(term) ||
                section.content.toLocaleLowerCase('pt-BR').includes(term)
            )
        );
    }, [search]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredRights}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listaConteudo}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>

                        <View style={styles.header}>

                            <View style={styles.headerText}>
                                <Text style={styles.titulo}>Seus direitos</Text>
                                <Text style={styles.subtitulo}>Informação para trabalhar com mais segurança.</Text>
                            </View>

                            <View style={styles.headerIcon}>
                                <Ionicons name="scale-outline" size={27} color="#8D4059" />
                            </View>

                        </View>

                        <View style={styles.highlightCard}>

                            <View style={styles.highlightHeading}>
                                <Ionicons name="book-outline" size={21} color="#FFFFFF" />
                                <Text style={styles.highlightTitulo}>Conhecer é se proteger.</Text>
                            </View>

                            <Text style={styles.highlightDescricao}>Entenda seus direitos, reconheça situações que merecem atenção e saiba onde buscar orientação.</Text>

                        </View>

                        <View style={styles.searchContainer}>

                            <Ionicons name="search-outline" size={21} color="#8D4059" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar um direito ou assunto..."
                                placeholderTextColor="#A38F98"
                                value={search}
                                onChangeText={setSearch}
                                returnKeyType="search"
                            />
                            {search.length > 0 && (
                                <Pressable onPress={() => setSearch('')} accessibilityLabel="Limpar pesquisa">
                                    <Ionicons name="close-circle" size={20} color="#A38F98" />
                                </Pressable>
                            )}
                        </View>

                        <View style={styles.sectionHeader}>

                            <Text style={styles.sectionTitulo}>{search.trim() ? 'Resultados da pesquisa' : 'Explore por assunto'}</Text>
                            <Text style={styles.sectionContador}>{filteredRights.length} categorias</Text>
                        
                        </View>
                    </View>
                }

                renderItem={({ item }) => (
                    <RightCategoryCard
                        category={item}
                        onPress={() => navigation.navigate('RightDetails', { categoryId: item.id })}
                    />
                )}

                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={40} color="#8D4059" />
                        <Text style={styles.emptyTitulo}>Nenhum resultado encontrado</Text>
                        <Text style={styles.emptyDescricao}>Tente pesquisar por outro termo ou assunto relacionado aos direitos trabalhistas.</Text>
                    </View>
                }

                ListFooterComponent={
                    <View style={styles.footer}>
                        <Ionicons name="information-circle-outline" size={17} color="#806F76" />
                        <Text style={styles.footerText}>Conteúdo informativo. As regras podem variar conforme o vínculo de trabalho e a legislação aplicável.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    listaConteudo: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 35,
        flexGrow: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    headerText: {
        flex: 1,
        paddingRight: 15,
    },

    titulo: {
        fontSize: 27,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 7,
    },

    subtitulo: {
        fontSize: 13,
        color: '#806F76',
        lineHeight: 20,
    },

    headerIcon: {
        width: 54,
        height: 54,
        borderRadius: 16,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    highlightCard: {
        backgroundColor: '#542039',
        borderRadius: 20,
        padding: 20,
        marginBottom: 22,
    },

    highlightHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 11,
    },

    highlightTitulo: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFFFFF',
        flex: 1,
    },

    highlightDescricao: {
        fontSize: 13,
        color: '#F9E6DF',
        lineHeight: 21,
    },

    searchContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F0DDD7',
        borderRadius: 14,
        paddingHorizontal: 15,
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
        marginBottom: 25,
    },

    searchInput: {
        flex: 1,
        fontSize: 13,
        color: '#30212A',
        paddingVertical: 10,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        gap: 10,
    },

    sectionTitulo: {
        fontSize: 17,
        fontWeight: '800',
        color: '#542039',
        flex: 1,
    },

    sectionContador: {
        fontSize: 11,
        color: '#806F76',
    },

    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
        gap: 12,
    },

    emptyTitulo: {
        fontSize: 15,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
    },

    emptyDescricao: {
        fontSize: 12,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 20,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 9,
        marginTop: 17,
        paddingHorizontal: 5,
    },

    footerText: {
        flex: 1,
        fontSize: 11,
        color: '#806F76',
        lineHeight: 18,
    },
});

