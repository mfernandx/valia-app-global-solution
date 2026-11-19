import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { COMMUNITY_CATEGORIES } from '../../utils/communityCategory';
import { communityPostService } from '../../services/communityPostService';
import { createCommunityPostSchema } from '../../validations/communitySchema';
import type { CommunityPostFormData } from '../../validations/communitySchema';

export default function CreateCommunityPostScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const queryClient = useQueryClient();

    const { control, handleSubmit, watch, formState: { errors } } = useForm<CommunityPostFormData>({
        resolver: yupResolver(createCommunityPostSchema),
        defaultValues: {
            category: 1,
            title: '',
            content: '',
            isAnonymous: false,
        },
    });

    const title = watch('title');
    const content = watch('content');

    const createMutation = useMutation({
        mutationFn: communityPostService.create,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['communityPosts'] });
            Alert.alert('Publicação criada!', 'Sua publicação foi compartilhada com a comunidade.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        },
        onError: () => {
            Alert.alert('Erro', 'Não foi possível criar sua publicação. Tente novamente.');
        },
    });

    function onSubmit(data: CommunityPostFormData) {
        createMutation.mutate({
            category: data.category,
            title: data.title.trim(),
            content: data.content.trim(),
            isAnonymous: data.isAnonymous,
        });
    }

    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            
            <ScrollView contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + 15 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                
                <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={23} color="#542039" />
                </Pressable>

                <Text style={styles.titulo}>Nova publicação</Text>
                <Text style={styles.subtitulo}>Compartilhe sua experiência, dúvida ou conhecimento com a comunidade.</Text>

                <View style={styles.formCard}>

                    <Text style={styles.label}>Categoria</Text>
                    <Text style={styles.fieldDica}>Escolha o assunto que melhor representa sua publicação.</Text>

                    <Controller
                        control={control}
                        name="category"
                        render={({ field: { value, onChange } }) => (

                            <View style={styles.categoriasContainer}>

                                {COMMUNITY_CATEGORIES.map(category => (

                                    <Pressable key={category.value} style={[styles.categoriaOpcao, value === category.value && styles.categoriaOpcaoSelected]} onPress={() => onChange(category.value)}>
                                        <Text style={[styles.categoriaOpcaoText, value === category.value && styles.categoriaOpcaoTextSelected]}>
                                            {category.label}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    />

                    {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

                    <Text style={styles.label}>Título</Text>
                    <Controller control={control} name="title" render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Dê um título à sua publicação"
                                placeholderTextColor="#A49399"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                maxLength={150}
                            />
                        )}
                    />

                    <Text style={styles.contagemCaracteres}>{title?.length ?? 0}/150</Text>
                    
                    {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

                    <Text style={styles.label}>Conteúdo</Text>
                    <Controller control={control} name="content" render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                style={[styles.input, styles.conteudoInput]}
                                placeholder="Escreva aqui o que deseja compartilhar..."
                                placeholderTextColor="#A49399"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                multiline
                                textAlignVertical="top"
                                maxLength={5000}
                            />
                        )}
                    />

                    <Text style={styles.contagemCaracteres}>{content?.length ?? 0}/5000</Text>
                    
                    {errors.content && <Text style={styles.errorText}>{errors.content.message}</Text>}

                    <Controller control={control} name="isAnonymous" render={({ field: { value, onChange } }) => (

                            <View style={styles.anonimoContainer}>

                                <View style={styles.anonimoIcon}>
                                    <Ionicons name="eye-off-outline" size={22} color="#8D4059" />
                                </View>

                                <View style={styles.anonimoInfo}>
                                    <Text style={styles.anonimoTitulo}>Publicar anonimamente</Text>
                                    <Text style={styles.anonimoDescricao}>Seu nome não será exibido para outros usuários.</Text>
                                </View>

                                <Switch value={value} onValueChange={onChange} trackColor={{ false: '#E8D7D2', true: '#DDA6B6' }} thumbColor={value ? '#8D4059' : '#FFFFFF'}/>
                            </View>
                        )}
                    />
                </View>

                <Pressable
                    style={[styles.enviarButton, createMutation.isPending && styles.enviarButtonDisabled]}
                    onPress={() => { void handleSubmit(onSubmit)(); }}
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Ionicons name="paper-plane-outline" size={19} color="#FFFFFF" />
                    )}

                    <Text style={styles.enviarButtonText}>{createMutation.isPending ? 'Publicando...' : 'Publicar na comunidade'}</Text>
                </Pressable>

                <Text style={styles.footerText}>Compartilhe com respeito. Sua contribuição ajuda a construir uma comunidade mais informada e acolhedora.</Text>
            
            </ScrollView>

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
        marginBottom: 22,
    },

    titulo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 7,
    },

    subtitulo: {
        fontSize: 14,
        color: '#30212A',
        lineHeight: 21,
        marginBottom: 25,
    },

    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0DDD7',
        padding: 20,
        marginBottom: 22,
    },

    label: {
        fontSize: 14,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 10,
    },

    fieldDica: {
        fontSize: 12,
        color: '#806F76',
        marginBottom: 14,
    },

    categoriasContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 9,
        marginBottom: 24,
    },

    categoriaOpcao: {
        borderWidth: 1,
        borderColor: '#F0DDD7',
        backgroundColor: '#FFF7F1',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 9,
    },

    categoriaOpcaoSelected: {
        backgroundColor: '#542039',
        borderColor: '#542039',
    },

    categoriaOpcaoText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#542039',
    },

    categoriaOpcaoTextSelected: {
        color: '#FFFFFF',
    },

    input: {
        borderWidth: 1,
        borderColor: '#F0DDD7',
        backgroundColor: '#FFF7F1',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 13,
        fontSize: 14,
        color: '#30212A',
    },

    conteudoInput: {
        minHeight: 170,
        paddingTop: 15,
    },

    contagemCaracteres: {
        fontSize: 11,
        color: '#806F76',
        textAlign: 'right',
        marginTop: 6,
        marginBottom: 20,
    },

    errorText: {
        fontSize: 12,
        color: '#C05745',
        marginTop: -12,
        marginBottom: 17,
    },

    anonimoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F4EAE7',
        paddingTop: 20,
    },

    anonimoIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#FFF1EC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    anonimoInfo: {
        flex: 1,
    },

    anonimoTitulo: {
        fontSize: 13,
        fontWeight: '800',
        color: '#542039',
        marginBottom: 5,
    },

    anonimoDescricao: {
        fontSize: 11,
        color: '#806F76',
        lineHeight: 17,
    },

    enviarButton: {
        backgroundColor: '#D76D45',
        borderRadius: 13,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
    },

    enviarButtonDisabled: {
        opacity: 0.65,
    },

    enviarButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    footerText: {
        fontSize: 12,
        color: '#806F76',
        textAlign: 'center',
        lineHeight: 19,
        marginTop: 18,
    },
});
