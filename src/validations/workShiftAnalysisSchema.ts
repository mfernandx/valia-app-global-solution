
import * as yup from 'yup';

export function parseAnalysisDate(value: string): Date | null {

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return null;

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
    return date;

}

export function toApiAnalysisDate(value: string): string {

    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;

}

export const workShiftAnalysisSchema = yup.object({

    employmentId: yup.string().required('Selecione um vínculo profissional.'),
    startDate: yup.string().required('Informe a data inicial.').test('valid-date', 'Informe uma data inicial válida.', value => !value || !!parseAnalysisDate(value)),
    endDate: yup.string().required('Informe a data final.').test('valid-date', 'Informe uma data final válida.', value => !value || !!parseAnalysisDate(value)),

}).test('valid-period', function (values) {

    if (!values) return true;

    const start = parseAnalysisDate(values.startDate);
    const end = parseAnalysisDate(values.endDate);
    
    if (!start || !end) return true;

    const days = Math.round((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000);

    if (days < 0) return this.createError({ path: 'endDate', message: 'A data final deve ser igual ou posterior à inicial.' });
    if (days > 366) return this.createError({ path: 'endDate', message: 'O período não pode ultrapassar 366 dias.' });

    return true;

});
