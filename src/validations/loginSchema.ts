
import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().required('Informe seu e-mail.').email('Informe um e-mail válido.'),
    password: yup.string().required('Informe sua senha.'),
});
