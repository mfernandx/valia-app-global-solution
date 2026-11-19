
import * as yup from 'yup';

export const createCommunityPostSchema = yup.object({

    category: yup.number().required('Selecione uma categoria.').oneOf([1, 2, 3, 4, 5], 'Selecione uma categoria válida.'),
    title: yup.string().trim().required('Informe o título da publicação.').max(150, 'O título deve ter no máximo 150 caracteres.'),
    content: yup.string().trim().required('Escreva o conteúdo da publicação.').max(5000, 'O conteúdo deve ter no máximo 5000 caracteres.'),
    isAnonymous: yup.boolean().required(),
    
});

export type CommunityPostFormData = yup.InferType<typeof createCommunityPostSchema>;
