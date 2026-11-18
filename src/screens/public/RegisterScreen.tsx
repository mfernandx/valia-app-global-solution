import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validations/registerSchema';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import AppCheckbox from '../../components/AppCheckbox';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import type { RegisterFormData } from '../../models/auth';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';

type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {

    const navigation = useNavigation<RegisterNavigationProp>();
    const { register } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptedTerms: false,
        },
    });


    async function onSubmit(data: RegisterFormData) {
        try {
            setIsSubmitting(true);
            await register({fullName: data.fullName, email: data.email, password: data.password});
        
        } catch (error) {
            if (error instanceof AxiosError) {

                if (error.response?.status === 409) {
                    Alert.alert('Cadastro não realizado', 'Este e-mail já está cadastrado.');
                
                } else if (!error.response) {
                    Alert.alert('Erro de conexão', 'Não foi possível conectar à API.');
                
                } else {
                    Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
                }
            } else {
                Alert.alert('Erro', 'Ocorreu um erro inesperado.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <ImageBackground source={require('../../../assets/cadastro-background.png')} style={styles.background} resizeMode="stretch">

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                <ScrollView contentContainerStyle={styles.scrollConteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                    <View style={styles.conteudo}>
                        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Voltar para login" style={styles.returnButton}>
                            <Ionicons name="chevron-back" size={27} color="#542039" />
                        </Pressable>

                        <Image source={require('../../../assets/logo-valia.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo Valia" />

                        <Text style={styles.titulo}>Crie sua conta</Text>

                        <Text style={styles.subtitulo}>Preencha os dados abaixo para{'\n'}começar a usar o Valia.</Text>

                        <View style={styles.form}>
                            <Controller control={control} name="fullName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        icon="person-outline"
                                        placeholder="Nome completo"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="words"
                                        autoComplete="name"
                                        error={errors.fullName?.message}
                                    />
                                )}
                            />

                            <Controller control={control} name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        icon="mail-outline"
                                        placeholder="E-mail"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        error={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller control={control} name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        icon="lock-closed-outline"
                                        placeholder="Senha"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        isPassword
                                        autoComplete="new-password"
                                        error={errors.password?.message}
                                    />
                                )}
                            />

                            <Controller control={control} name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        icon="lock-closed-outline"
                                        placeholder="Confirmar senha"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        isPassword
                                        autoComplete="new-password"
                                        error={errors.confirmPassword?.message}
                                    />
                                )}
                            />

                            <View style={styles.termosRow}>
                                <Controller control={control} name="acceptedTerms"
                                    render={({ field: { onChange, value } }) => (
                                        <AppCheckbox checked={value} onChange={onChange} label="Aceitar os termos de uso e política de privacidade" />
                                    )}
                                />

                                <Text style={styles.termosText}>
                                    Li e aceito os{' '}
                                    <Text style={styles.termosHighlight}>Termos de Uso</Text>
                                    {' '}e a{' '}
                                    <Text style={styles.termosHighlight}>Política de {'\n'}Privacidade</Text>
                                    {' '}do Valia.
                                </Text>
                            </View>

                            {errors.acceptedTerms && (
                                <Text style={styles.errorText}>{errors.acceptedTerms.message}</Text>
                            )}

                            <AppButton title="Cadastrar" icon="arrow-forward-outline" onPress={handleSubmit(onSubmit)} loading={isSubmitting}/>

                            <View style={styles.loginRow}>
                                <Text style={styles.loginText}>Já tem uma conta?{' '}</Text>

                                <Pressable onPress={() => navigation.navigate('Login')} accessibilityRole="button" style={styles.loginLink}>
                                    <Text style={styles.loginLinkText}>Entrar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#FFF7F1',
    },

    container: {
        flex: 1,
    },

    scrollConteudo: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 26,
        paddingTop: 35,
        paddingBottom: 100,
    },

    conteudo: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
        alignItems: 'center',
    },

    returnButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 44,
        height: 44,
        justifyContent: 'center',
        zIndex: 2,
    },

    logo: {
        width: 155,
        height: 125,
        marginBottom: 5,
        marginTop: 50,
    },

    titulo: {
        fontSize: 26,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
        marginBottom: 7,
    },

    subtitulo: {
        fontSize: 15,
        color: '#51464A',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },

    form: {
        width: '100%',
    },

    termosRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 17,
    },

    termosText: {
        flex: 1,
        fontSize: 12,
        color: '#51464A',
        lineHeight: 18,
    },

    termosHighlight: {
        color: '#812443',
        fontWeight: '700',
    },

    errorText: {
        color: '#B3261E',
        fontSize: 12,
        marginBottom: 12,
        marginLeft: 12,
    },

    loginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    loginText: {
        fontSize: 13,
        color: '#51464A',
    },

    loginLink: {
        minHeight: 44,
        justifyContent: 'center',
    },

    loginLinkText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#812443',
    },
});
