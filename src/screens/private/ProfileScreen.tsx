import React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR');
}

function formatPhone(value: string | null) {

    if (!value) return 'Não informado';

    const digits = value.replace(/\D/g, '');

    if (digits.length === 11) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    if (digits.length === 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return value;
}

interface ProfileInfoProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    label: string;
    value: string;
}

function ProfileInfo({ icon, label, value }: ProfileInfoProps) {

    return (

        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <Ionicons name={icon} size={20} color="#8D4059" />
            </View>

            <View style={styles.infoConteudo}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValor}>{value}</Text>
            </View>
        </View>

    );

}

export default function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const { data: user, isLoading, isError, refetch } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getMe,
    });

    const deactivateMutation = useMutation({

        mutationFn: userService.deactivateAccount,
        onSuccess: async () => {
            try {
                await logout();
                queryClient.clear();

            } catch {
                Alert.alert(
                    'Conta desativada',
                    'Sua conta foi desativada, mas houve um problema ao encerrar a sessão. Tente sair novamente.'
                );
            }
        },

        onError: () => {
            Alert.alert('Erro', 'Não foi possível desativar sua conta. Tente novamente.');
        },
    });

    function handleLogout() {
        Alert.alert(
            'Sair da conta',
            'Tem certeza de que deseja encerrar sua sessão?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                            queryClient.clear();
                        } catch {
                            Alert.alert('Erro', 'Não foi possível encerrar sua sessão.');
                        }
                    },
                },
            ]
        );
    }

    function handleDeactivate() {
        Alert.alert(
            'Desativar conta',
            'Tem certeza de que deseja desativar sua conta? Você perderá o acesso ao Valia e precisará de um processo de reativação para utilizá-lo novamente.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Desativar',
                    style: 'destructive',
                    onPress: () => deactivateMutation.mutate(),
                },
            ]
        );
    }

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#8D4059" />
                <Text style={styles.ajudaText}>Carregando seu perfil...</Text>
            </View>
        );
    }

    if (isError || !user) {
        return (
            <View style={styles.center}>
                <Ionicons name="cloud-offline-outline" size={38} color="#8D4059" />
                <Text style={styles.ajudaText}>Não foi possível carregar seu perfil.</Text>

                <Pressable style={styles.retryButton} onPress={() => { void refetch(); }}>
                    <Text style={styles.retryText}>Tentar novamente</Text>
                </Pressable>
            </View>
        );
    }

    const initials = user.fullName.trim().split(/\s+/).slice(0, 2)
        .map(name => name.charAt(0).toUpperCase()).join('');

    return (

        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo}>

                <Text style={styles.titulo}>Meu perfil</Text>
                <Text style={styles.subtitulo}>Gerencie suas informações e sua conta.</Text>

                <View style={styles.profileCard}>

                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials || 'U'}</Text>
                    </View>

                    <Text style={styles.nomeCompleto}>{user.fullName}</Text>
                    <Text style={styles.perfilEmail}>{user.email}</Text>

                    <View style={styles.ativoBadge}>
                        <View style={styles.ativoPonto} />
                        <Text style={styles.ativoText}>Conta ativa</Text>
                    </View>

                </View>

                <Text style={styles.sectionTitulo}>Informações pessoais</Text>

                <View style={styles.infoCard}>

                    <ProfileInfo icon="person-outline" label="Nome completo" value={user.fullName} />
                    <ProfileInfo icon="mail-outline" label="E-mail" value={user.email} />
                    <ProfileInfo icon="call-outline" label="Telefone" value={formatPhone(user.phoneNumber)} />
                    <ProfileInfo icon="calendar-outline" label="Membro desde" value={formatDate(user.createdAt)} />
                
                </View>

                <Text style={styles.sectionTitulo}>Minha conta</Text>

                <View style={styles.acoesCard}>

                    <Pressable style={styles.acaoRow} onPress={() => navigation.navigate('EditProfile')}>
                        <Ionicons name="create-outline" size={21} color="#8D4059" />
                        <Text style={styles.acaoText}>Editar informações</Text>
                        <Ionicons name="chevron-forward" size={18} color="#8D4059" />
                    </Pressable>

                    <View style={styles.acaoDivisor} />

                    <Pressable style={styles.acaoRow} onPress={() => navigation.navigate('Employments')}>
                        <Ionicons name="briefcase-outline" size={21} color="#8D4059" />
                        <Text style={styles.acaoText}>Meus vínculos</Text>
                        <Ionicons name="chevron-forward" size={18} color="#8D4059" />
                    </Pressable>

                    <View style={styles.acaoDivisor} />

                    <Pressable style={styles.acaoRow} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={21} color="#8D4059" />
                        <Text style={styles.acaoText}>Sair da conta</Text>
                        <Ionicons name="chevron-forward" size={18} color="#8D4059" />
                    </Pressable>

                    <View style={styles.acaoDivisor} />

                    <Pressable style={styles.acaoRow} onPress={handleDeactivate} disabled={deactivateMutation.isPending}>
                        <Ionicons name="person-remove-outline" size={21} color="#C05745" />

                        <Text style={[styles.acaoText, { color: '#C05745' }]}>
                            {deactivateMutation.isPending ? 'Desativando conta...' : 'Desativar minha conta'}
                        </Text>

                        {deactivateMutation.isPending ? <ActivityIndicator size="small" color="#C05745" />
                            : <Ionicons name="chevron-forward" size={18} color="#C05745" />}
                    </Pressable>
                </View>

                <Text style={styles.footerText}>Seus dados pessoais são utilizados para identificar sua conta e permitir o acesso às funcionalidades do Valia.</Text>
            
            </ScrollView>
        
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
        paddingBottom: 45,
    },

    center: {
        flex: 1,
        backgroundColor: '#FFF7F1',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        padding: 25,
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
        marginBottom: 23,
    },

    profileCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 25,
        alignItems: 'center',
        marginBottom: 27,
    },

    avatar: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#F9E6DF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 13,
    },

    avatarText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#8D4059',
    },

    nomeCompleto: {
        fontSize: 20,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
    },

    perfilEmail: {
        fontSize: 13,
        color: '#806F76',
        marginTop: 6,
    },

    ativoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        backgroundColor: '#E5F3EC',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        marginTop: 15,
    },

    ativoPonto: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#387D65',
    },

    ativoText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#387D65',
    },

    sectionTitulo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 15,
    },

    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        marginBottom: 27,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F4EAE7',
    },

    infoIcon: {
        width: 39,
        height: 39,
        borderRadius: 11,
        backgroundColor: '#FFF1EC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoConteudo: {
        flex: 1,
    },

    infoLabel: {
        fontSize: 12,
        color: '#806F76',
        marginBottom: 4,
    },

    infoValor: {
        fontSize: 14,
        fontWeight: '600',
        color: '#30212A',
    },

    acoesCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        paddingHorizontal: 18,
        marginBottom: 25,
    },

    acaoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 19,
    },

    acaoText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '700',
        color: '#542039',
    },

    acaoDivisor: {
        height: 1,
        backgroundColor: '#F4EAE7',
    },

    footerText: {
        fontSize: 12,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 19,
    },

    ajudaText: {
        fontSize: 14,
        color: '#30212A',
        textAlign: 'center',
    },

    retryButton: {
        backgroundColor: '#542039',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },

    retryText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});



