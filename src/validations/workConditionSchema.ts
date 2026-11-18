import * as yup from 'yup';

export const workConditionSchema = yup.object({

    employmentId: yup.string().required('Selecione um vínculo profissional.'),
    assessmentDate: yup.string().required('Informe a data da avaliação.').test(
        'valid-date','Informe uma data válida.',
        value => {
            if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

            const [year, month, day] = value.split('-').map(Number);
            const date = new Date(year, month - 1, day);

            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        }
    ).test(
        'not-future','A data da avaliação não pode ser futura.',

        value => {
            if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;

            const today = new Date();
            const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            return value <= localToday;
        }
    ),

});
