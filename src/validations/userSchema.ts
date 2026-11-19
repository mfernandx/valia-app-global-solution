import * as yup from 'yup';

export const updateEmailSchema = yup.object({
    email: yup.string().trim().required('O e-mail é obrigatório.').email('Informe um e-mail válido.'),
});

export const updatePhoneSchema = yup.object({
    phoneNumber: yup.string().trim().required('Informe um telefone.')
        .test('valid-phone', 'Informe um telefone válido com DDD.', value => {
            const digits = (value ?? '').replace(/\D/g, '');
            return digits.length === 10 || digits.length === 11;
        }),
});