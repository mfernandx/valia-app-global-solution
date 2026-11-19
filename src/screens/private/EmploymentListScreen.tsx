import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import AppButton from '../../components/AppButton';
import EmploymentCard from '../../components/employment/EmploymentCard';
import { employmentService } from '../../services/employmentService';
import type { EmploymentStackParamList } from '../../navigation/EmploymentNavigator';

type NavigationProp = NativeStackNavigationProp<EmploymentStackParamList, 'EmploymentList'>;

export default function EmploymentListScreen() {

    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();

    const { data: employments = [], isLoading, isError, isRefetching, refetch } = useQuery({
        queryKey: ['employments'],
        queryFn: employmentService.getAll,
    });

    return (

        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <FlatList
                data={employments}
                keyExtractor={item => item.employmentId}
                contentContainerStyle={styles.conteudo}
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
                        <Pressable style={styles.returnButton} onPress={() => navigation.getParent()?.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="#542039" />
                        </Pressable>

                        <Text style={styles.titulo}>Meus vínculos</Text>
                        <Text style={styles.subtitulo}>Organize e acompanhe seus vínculos profissionais.</Text>

                        <View style={styles.banner}>
                            <Ionicons name="briefcase-outline" size={28} color="#8D4059" />

                            <View style={styles.bannerConteudo}>
                                <Text style={styles.bannerTitulo}>Sua trajetória profissional</Text>
                                <Text style={styles.bannerText}>Cadastre seus vínculos para registrar jornadas, avaliar condições de trabalho e organizar suas informações.</Text>
                            </View>
                        </View>

                        <AppButton
                            title="Cadastrar vínculo"
                            icon="add-outline"
                            onPress={() => navigation.navigate('EmploymentForm', {})}
                        />

                        <View style={styles.sectionHeader}>

                            <Text style={styles.sectionTitulo}>Vínculos cadastrados</Text>
                            {!isLoading && !isError && (
                                <Text style={styles.contador}>{employments.length}</Text>
                            )}

                        </View>
                    </>
                }

                renderItem={({ item }) => (
                    <EmploymentCard
                        employment={item}
                        onPress={() => navigation.navigate('EmploymentDetails', { employmentId: item.employmentId, })}
                    />
                )}

                ListEmptyComponent={

                    isLoading ? (
                        <ActivityIndicator size="large" color="#8D4059" style={styles.loading} />
                    ) : isError ? (

                        <View style={styles.emptyCard}>

                            <Ionicons name="cloud-offline-outline" size={32} color="#8D4059" />

                            <Text style={styles.emptyTitulo}>Não foi possível carregar seus vínculos</Text>

                            <Text style={styles.emptyText}>Verifique sua conexão e tente novamente.</Text>

                            <AppButton title="Tentar novamente" onPress={() => { void refetch(); }} />
                        </View>

                    ) : (

                        <View style={styles.emptyCard}>

                            <Ionicons name="folder-open-outline" size={34} color="#8D4059" />

                            <Text style={styles.emptyTitulo}>Nenhum vínculo cadastrado</Text>

                            <Text style={styles.emptyText}>Comece cadastrando seu primeiro vínculo profissional.</Text>

                        </View>

                    )
                }
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
        flexGrow: 1,
    },

    returnButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        marginBottom: 8,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 5,
    },

    subtitulo: {
        fontSize: 14,
        color: '#51464A',
        marginBottom: 22,
    },

    banner: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: '#F9E6DF',
        borderRadius: 17,
        padding: 17,
        marginBottom: 23,
    },

    bannerConteudo: {
        flex: 1,
    },

    bannerTitulo: {
        fontSize: 14,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 7,
        marginTop: 6,
    },

    bannerText: {
        fontSize: 12,
        color: '#51464A',
        lineHeight: 19,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 15,
    },

    sectionTitulo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#542039',
    },

    contador: {
        backgroundColor: '#F1DFE3',
        color: '#8D4059',
        fontSize: 12,
        fontWeight: '800',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        overflow: 'hidden',
    },

    loading: {
        marginTop: 35,
    },

    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F0DDD7',
        borderRadius: 18,
        padding: 25,
        alignItems: 'center',
        gap: 12,
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
        lineHeight: 20,
    },

});

