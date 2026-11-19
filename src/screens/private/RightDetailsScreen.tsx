import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { laborRights } from '../../data/laborRights';

export default function RightDetailsScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'RightDetails'>>();
    const insets = useSafeAreaInsets();
    const category = laborRights.find(item => item.id === route.params.categoryId);

    if (!category) {
        return (

            <View style={[styles.container, styles.notFoundContainer, { paddingTop: insets.top }]}>
                
                <Ionicons name="alert-circle-outline" size={45} color="#8D4059" />
                <Text style={styles.notFoundTitulo}>Categoria não encontrada</Text>
                <Text style={styles.notFoundDescricao}>Não foi possível localizar as informações solicitadas.</Text>
                
                <Pressable style={styles.returnButtonFilled} onPress={() => navigation.goBack()}>
                    <Text style={styles.returnButtonText}>Voltar aos direitos</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollConteudo, { paddingTop: insets.top + 15, paddingBottom: insets.bottom + 35 }]}>
                
                <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={21} color="#542039" />
                    <Text style={styles.returnLabel}>Voltar aos direitos</Text>
                </Pressable>

                <View style={styles.categoriaHeader}>

                    <View style={styles.categoriaIcon}>
                        <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={30} color="#8D4059"/>
                    </View>

                    <Text style={styles.titulo}>{category.title}</Text>
                    <Text style={styles.subtitulo}>{category.description}</Text>
                </View>

                <View style={styles.introCard}>

                    <Ionicons name="book-outline" size={22} color="#FFFFFF" />

                    <View style={styles.introConteudo}>
                        <Text style={styles.introTitulo}>Entenda seus direitos</Text>
                        <Text style={styles.introDescricao}>Informação acessível para ajudar você a compreender seus direitos e reconhecer situações que merecem atenção.</Text>
                    </View>

                </View>

                <Text style={styles.sectionHeading}>O que você precisa saber</Text>

                {category.sections.map((section, index) => (

                    <View key={`${category.id}-${index}`} style={styles.infoCard}>

                        <View style={styles.infoHeader}>

                            <View style={styles.numeroBadge}>
                                <Text style={styles.numeroText}>{String(index + 1).padStart(2, '0')}</Text>
                            </View>

                            <Text style={styles.infoTitulo}>{section.title}</Text>
                        </View>

                        <Text style={styles.infoConteudo}>{section.content}</Text>
                    </View>
                ))}

                <View style={styles.referenciasCard}>

                    <View style={styles.referenciasHeader}>
                        <Ionicons name="library-outline" size={21} color="#8D4059" />
                        <Text style={styles.referenciasTitulo}>Referências legais e oficiais</Text>
                    </View>

                    {category.legalReferences.map((reference, index) => (
                        <View key={`${reference}-${index}`} style={styles.referenciasRow}>
                            <View style={styles.referenciaPonto} />
                            <Text style={styles.referenciaText}>{reference}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.noticia}>
                    <Ionicons name="information-circle-outline" size={21} color="#8D4059" />
                    <Text style={styles.noticiaText}>Este conteúdo é informativo e não substitui orientação jurídica individualizada. A aplicação dos direitos pode variar conforme o tipo de vínculo, a legislação específica e as normas coletivas aplicáveis.</Text>
                </View>

            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    scrollConteudo: {
        paddingHorizontal: 20,
    },

    returnButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        alignSelf: 'flex-start',
        marginBottom: 27,
    },

    returnLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#542039',
    },

    categoriaHeader: {
        alignItems: 'center',
        marginBottom: 25,
    },

    categoriaIcon: {
        width: 72,
        height: 72,
        borderRadius: 22,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
        marginBottom: 9,
    },

    subtitulo: {
        fontSize: 13,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 21,
    },

    introCard: {
        backgroundColor: '#542039',
        borderRadius: 18,
        padding: 18,
        flexDirection: 'row',
        gap: 13,
        marginBottom: 29,
    },

    introConteudo: {
        flex: 1,
    },

    introTitulo: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 7,
    },

    introDescricao: {
        fontSize: 12,
        color: '#F9E6DF',
        lineHeight: 20,
    },

    sectionHeading: {
        fontSize: 17,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 16,
    },

    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 18,
        marginBottom: 13,
    },

    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
        marginBottom: 13,
    },

    numeroBadge: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    numeroText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#8D4059',
    },

    infoTitulo: {
        flex: 1,
        fontSize: 14,
        fontWeight: '800',
        color: '#542039',
    },

    infoConteudo: {
        fontSize: 13,
        color: '#51454B',
        lineHeight: 22,
    },

    referenciasCard: {
        backgroundColor: '#F9E6DF',
        borderRadius: 17,
        padding: 18,
        marginTop: 14,
        marginBottom: 17,
    },

    referenciasHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },

    referenciasTitulo: {
        flex: 1,
        fontSize: 14,
        fontWeight: '800',
        color: '#542039',
    },

    referenciasRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 10,
    },

    referenciaPonto: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#D76D45',
        marginTop: 7,
    },

    referenciaText: {
        flex: 1,
        fontSize: 12,
        color: '#542039',
        lineHeight: 19,
    },

    noticia: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        padding: 14,
        marginTop: 5,
    },

    noticiaText: {
        flex: 1,
        fontSize: 11,
        color: '#806F76',
        lineHeight: 19,
    },

    notFoundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        gap: 13,
    },

    notFoundTitulo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
    },

    notFoundDescricao: {
        fontSize: 13,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 20,
    },

    returnButtonFilled: {
        backgroundColor: '#542039',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 13,
        marginTop: 10,
    },

    returnButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

