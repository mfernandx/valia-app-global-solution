import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../../components/home/HomeHeader';
import RightsBanner from '../../components/home/RightsBanner';
import QuickActionCard from '../../components/home/QuickActionCard';
import EducationalCard from '../../components/home/EducationalCard';
import { useAuth } from '../../hooks/useAuth';
import type { AppTabParamList } from '../../navigation/AppTabNavigator';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeExploreCard from '../../components/home/HomeExploreCard';
import { Ionicons } from '@expo/vector-icons';

type HomeNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<AppTabParamList, 'Inicio'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {

    const { user } = useAuth();
    const navigation = useNavigation<HomeNavigationProp>();
    const insets = useSafeAreaInsets();

    function showPendingFeature(feature: string) {
        Alert.alert(feature, 'Em desenvolvimento.');
    }

    return (

        <ScrollView style={styles.container} contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
            <HomeHeader fullName={user?.fullName} onProfilePress={() => navigation.navigate('Perfil')} />
            <RightsBanner />

            <View style={styles.acoes}>
                <QuickActionCard title="Minha jornada" icon="calendar-outline" onPress={() => navigation.navigate('WorkShifts')} />
                <QuickActionCard title="Análise da jornada" icon="time-outline" onPress={() => navigation.navigate('WorkShiftAnalysis')} />
                <QuickActionCard title="Condições de trabalho" icon="clipboard-outline" onPress={() => navigation.navigate('WorkConditions')} />
                <QuickActionCard title="Meus vínculos" icon="briefcase-outline" onPress={() => navigation.navigate('Employments')} />
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitulo}>Saiba mais</Text>
                <Pressable onPress={() => navigation.navigate('Direitos')} accessibilityRole="button">
                    <Text style={styles.verTudo}>Ver tudo</Text>
                </Pressable>
            </View>

            <EducationalCard title="Horas extras: quais são seus direitos?" onPress={() => navigation.navigate('Direitos')} />

            <HomeExploreCard
                title="Sua voz tem espaço aqui"
                description="Compartilhe experiências, tire dúvidas e participe da comunidade."
                actionLabel="Explorar comunidade"
                icon="chatbubbles-outline"
                backgroundColor="#FFFFFF"
                iconColor="#8D4059"
                onPress={() => navigation.navigate('Comunidade')}
            />

            <HomeExploreCard
                title="Conheça seus direitos"
                description="Informação é o primeiro passo para reconhecer situações que merecem atenção."
                actionLabel="Consultar direitos"
                icon="shield-checkmark-outline"
                backgroundColor="#FBECE5"
                iconColor="#D76D45"
                onPress={() => navigation.navigate('Direitos')}
            />



        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF7F1'
    },

    conteudo: {
        paddingHorizontal: 23,
        paddingBottom: 28
    },

    acoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
        marginBottom: 24
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },

    sectionTitulo: {
        fontSize: 17,
        fontWeight: '800',
        color: '#30212A'
    },

    verTudo: {
        fontSize: 13,
        fontWeight: '600',
        color: '#812443'
    },

    exploreSection: {
        marginTop: 27
    },

    exploreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
});

