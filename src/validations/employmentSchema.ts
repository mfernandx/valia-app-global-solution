import * as yup from 'yup';

function isValidDate(value?: string | null) {
    if (!value || !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
}

function parseOptionalNumber(value: unknown, originalValue: unknown) {
    if (originalValue === '' || originalValue === null || originalValue === undefined) return null;

    if (typeof originalValue === 'string') {
        const normalized = originalValue.trim().replace(',', '.');
        return normalized === '' ? null : Number(normalized);
    }

    return value;
}

export const employmentSchema = yup.object({
    jobTitle: yup.string().trim().required('Informe o cargo ou função.').max(150, 'Máximo de 150 caracteres.'),

    employmentType: yup.number().typeError('Selecione o tipo de vínculo.').required('Selecione o tipo de vínculo.').oneOf([1, 2, 3, 4, 5, 6], 'Tipo de vínculo inválido.'),

    admissionDate: yup.string().required('Informe a data de admissão.').test(
        'valid-date',
        'Informe uma data válida no formato DD/MM/AAAA.',
        value => isValidDate(value)
    ),

    terminationDate: yup.string().optional().test(
        'valid-date',
        'Informe uma data de desligamento válida.',
        value => !value || isValidDate(value)
    ).test(
        'after-admission',
        'O desligamento não pode ser anterior à admissão.',
        function (value) {
            const admissionDate = this.parent.admissionDate;
            if (!value || !isValidDate(value) || !isValidDate(admissionDate)) return true;

            const toComparableDate = (date: string) => date.split('/').reverse().join('-');
            return toComparableDate(value) >= toComparableDate(admissionDate);
        }
    ),

    baseSalary: yup.number().nullable().transform(parseOptionalNumber).typeError('Informe um salário válido.')
        .min(0.01, 'O salário deve ser maior que zero.')
        .max(999999999.99, 'O salário excede o limite permitido.'),

    weeklyWorkload: yup.number().nullable().transform(parseOptionalNumber).typeError('Informe uma carga horária válida.')
        .min(0.01, 'A carga horária deve ser maior que zero.')
        .max(168, 'A carga horária não pode ultrapassar 168 horas.'),

    professionalCategory: yup.string().max(150, 'Máximo de 150 caracteres.').optional(),
});
