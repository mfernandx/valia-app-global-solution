import * as yup from 'yup';

export const registerSchema = yup.object({
    fullName: yup.string().required('Informe seu nome completo.').max(150, 'O nome deve ter no máximo 150 caracteres.'),
    email: yup.string().required('Informe seu e-mail.').email('Informe um e-mail válido.').max(200, 'O e-mail deve ter no máximo 200 caracteres.'),
    password: yup.string().required('Informe uma senha.').min(8, 'A senha deve ter pelo menos 8 caracteres.'),
    confirmPassword: yup.string().required('Confirme sua senha.').oneOf([yup.ref('password')], 'As senhas não coincidem.'),
    acceptedTerms: yup.boolean().required().oneOf([true], 'Você precisa aceitar os termos.'),
});
