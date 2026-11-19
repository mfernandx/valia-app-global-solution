import { useEffect } from 'react';
import {ActivityIndicator, Alert, Pressable, ScrollView,StyleSheet, Text, TextInput, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { userService } from '../../services/userService';
import { updateEmailSchema, updatePhoneSchema } from '../../validations/userSchema';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

type EmailFormData = {
    email: string;
};

type PhoneFormData = {
    phoneNumber: string;
};

function getErrorMessage(error: unknown): string {

    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === 'string' && data.trim()) return data;
        if (typeof data?.detail === 'string') return data.detail;
        if (typeof data?.message === 'string') return data.message;
    }

    return 'Não foi possível salvar as alterações. Tente novamente.';
}

export default function EditProfileScreen() {

    const navigation = useNavigation<Navigation>();
    const insets = useSafeAreaInsets();
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError, refetch } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getMe,
    });

    const emailForm = useForm<EmailFormData>({
        resolver: yupResolver(updateEmailSchema),
        defaultValues: { email: '' },
    });

    const phoneForm = useForm<PhoneFormData>({
        resolver: yupResolver(updatePhoneSchema),
        defaultValues: { phoneNumber: '' },
    });

    useEffect(() => {
        if (!user) return;

        emailForm.reset({ email: user.email });
        phoneForm.reset({ phoneNumber: user.phoneNumber ?? '' });
    }, [user, emailForm.reset, phoneForm.reset]);

    const emailMutation = useMutation({
        mutationFn: userService.updateEmail,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            Alert.alert('Sucesso', 'Seu e-mail foi atualizado.');
        },
        onError: error => {
            Alert.alert('Erro ao atualizar e-mail', getErrorMessage(error));
        },
    });

    const phoneMutation = useMutation({
        mutationFn: userService.updatePhone,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            Alert.alert('Sucesso', 'Seu telefone foi atualizado.');
        },
        onError: error => {
            Alert.alert('Erro ao atualizar telefone', getErrorMessage(error));
        },
    });

    const saveEmail = (data: EmailFormData) => {
        emailMutation.mutate({ email: data.email.trim() });
    };

    const savePhone = (data: PhoneFormData) => {
        phoneMutation.mutate({
            phoneNumber: data.phoneNumber.replace(/\D/g, ''),
        });
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#8D4059" />
                <Text style={styles.ajudaText}>Carregando informações...</Text>
            </View>
        );
    }

    if (isError || !user) {
        return (
            <View style={styles.center}>
                <Text style={styles.ajudaText}>Não foi possível carregar seus dados.</Text>
                <Pressable style={styles.retryButton} onPress={() => { void refetch(); }}>
                    <Text style={styles.buttonText}>Tentar novamente</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>

            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">

                <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Editar perfil</Text>
                <Text style={styles.subtitulo}>Mantenha suas informações pessoais atualizadas.</Text>

                <View style={styles.infoBanner}>
                    <Ionicons name="information-circle-outline" size={22} color="#8D4059" />
                    <Text style={styles.bannerText}>Seu nome completo não pode ser alterado nesta versão do aplicativo.</Text>
                </View>

                <Text style={styles.sectionTitulo}>E-mail</Text>

                <View style={styles.card}>
                    <Text style={styles.fieldLabel}>Endereço de e-mail</Text>

                    <Controller
                        control={emailForm.control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="seuemail@exemplo.com"
                                placeholderTextColor="#9A8A90"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        )}
                    />

                    {emailForm.formState.errors.email && (
                        <Text style={styles.errorText}>{emailForm.formState.errors.email.message}</Text>
                    )}

                    <Pressable
                        style={[styles.salvarButton, emailMutation.isPending && styles.disabledButton]}
                        disabled={emailMutation.isPending}
                        onPress={() => { void emailForm.handleSubmit(saveEmail)(); }}
                    >
                        {emailMutation.isPending ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Salvar e-mail</Text>}
                    </Pressable>
                </View>

                <Text style={styles.sectionTitulo}>Telefone</Text>

                <View style={styles.card}>
                    <Text style={styles.fieldLabel}>Número de telefone</Text>

                    <Controller
                        control={phoneForm.control}
                        name="phoneNumber"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="(11) 99999-9999"
                                placeholderTextColor="#9A8A90"
                                keyboardType="phone-pad"
                                maxLength={15}
                            />
                        )}
                    />

                    {phoneForm.formState.errors.phoneNumber && (
                        <Text style={styles.errorText}>{phoneForm.formState.errors.phoneNumber.message}</Text>
                    )}

                    <Pressable
                        style={[styles.salvarButton, phoneMutation.isPending && styles.disabledButton]}
                        disabled={phoneMutation.isPending}
                        onPress={() => { void phoneForm.handleSubmit(savePhone)(); }}
                    >
                        {phoneMutation.isPending ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Salvar telefone</Text>}
                    </Pressable>
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

    conteudo: {
        paddingHorizontal: 23,
        paddingBottom: 45,
    },

    center: {
        flex: 1,
        backgroundColor: '#FFF7F1',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        padding: 25,
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
        marginBottom: 23,
    },

    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#F9E6DF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 25,
    },

    bannerText: {
        flex: 1,
        fontSize: 12,
        color: '#542039',
        lineHeight: 19,
    },

    sectionTitulo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 14,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 18,
        marginBottom: 26,
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#542039',
        marginBottom: 9,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#EAD8D3',
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        color: '#30212A',
        backgroundColor: '#FFFDFC',
    },

    errorText: {
        fontSize: 12,
        color: '#C05745',
        marginTop: 7,
    },

    salvarButton: {
        height: 48,
        backgroundColor: '#542039',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },

    disabledButton: {
        opacity: 0.6,
    },

    buttonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    ajudaText: {
        fontSize: 14,
        color: '#51464A',
        textAlign: 'center',
    },

    retryButton: {
        backgroundColor: '#542039',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },
});
