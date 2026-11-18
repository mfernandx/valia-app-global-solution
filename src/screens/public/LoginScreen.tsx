import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validations/loginSchema';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import type { LoginFormData } from '../../models/auth';
import { useAuth } from '../../hooks/useAuth';
import { AxiosError } from 'axios';
import { useState } from 'react';

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {

    const navigation = useNavigation<LoginNavigationProp>();
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });


    async function onSubmit(data: LoginFormData) {
        try {
            setIsSubmitting(true);
            await login(data);

        } catch (error) {
            if (error instanceof AxiosError) {

                if (error.response?.status === 401) {
                    Alert.alert('Erro no login', 'E-mail ou senha inválidos.');

                } else if (!error.response) {
                    Alert.alert('Erro de conexão', 'Não foi possível conectar à API.');

                } else {
                    Alert.alert('Erro', 'Não foi possível realizar o login.');
                }

            } else {
                Alert.alert('Erro', 'Ocorreu um erro inesperado.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ImageBackground source={require('../../../assets/login-background.png')} style={styles.background} resizeMode="stretch">

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                <ScrollView contentContainerStyle={styles.scrollConteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View style={styles.conteudo}>
                        <Image source={require('../../../assets/logo-valia.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo Valia" />

                        <Text style={styles.titulo}>Bem-vindo(a) de volta!</Text>

                        <Text style={styles.subtitulo}>Acesse sua conta e acompanhe{'\n'}seus direitos no trabalho.</Text>

                        <View style={styles.form}>
                            <Controller control={control} name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <AppInput
                                        icon="mail-outline"
                                        placeholder="E-mail"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        keyboardType="email-address"
                                        autoComplete="email"
                                        autoCapitalize="none"
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
                                        autoComplete="password"
                                        error={errors.password?.message}
                                    />
                                )}
                            />

                            <AppButton title="Entrar" icon="arrow-forward-outline" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

                            <View style={styles.divisor}>
                                <View style={styles.linha} />
                                <Text style={styles.divisorText}>ou</Text>
                                <View style={styles.linha} />
                            </View>

                            <AppButton title="Criar uma conta" icon="person-add-outline" variant="outline" onPress={() => navigation.navigate('Register')} />
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
        paddingTop: 40,
        paddingBottom: 105,
    },

    conteudo: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 170,
        height: 145,
        marginBottom: 24,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitulo: {
        fontSize: 15,
        color: '#51464A',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },

    form: {
        width: '100%',
    },

    divisor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 19,
    },

    linha: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5D3D0',
    },

    divisorText: {
        fontSize: 13,
        color: '#51464A',
        marginHorizontal: 12,
    },
});
