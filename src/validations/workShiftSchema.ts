
import * as yup from 'yup';

const isValidDate = (value: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const isValidTime = (value: string) => {
    if (!/^\d{2}:\d{2}$/.test(value)) return false;
    const [hours, minutes] = value.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

export const workShiftSchema = yup.object({

    employmentId: yup.string().required('Selecione um vínculo profissional.'),
    date: yup.string().required('Informe a data.').test('date', 'Informe uma data válida.', isValidDate),
    startTime: yup.string().required('Informe a entrada.').test('time', 'Horário inválido.', isValidTime),
    endTime: yup.string().required('Informe a saída.').test('time', 'Horário inválido.', isValidTime),
    breakStart: yup.string().default('').test('time', 'Horário inválido.', value => !value || isValidTime(value)),
    breakEnd: yup.string().default('').test('time', 'Horário inválido.', value => !value || isValidTime(value)),
    notes: yup.string().default('').max(1000, 'Máximo de 1.000 caracteres.'),
    endsNextDay: yup.boolean().required(),

}).test('shift-times', function (values) {

    if (!values || !isValidDate(values.date) || !isValidTime(values.startTime) || !isValidTime(values.endTime)) return true;

    const toMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const start = toMinutes(values.startTime);
    const end = toMinutes(values.endTime) + (values.endsNextDay ? 1440 : 0);

    if (end <= start) {
        return this.createError({ path: 'endTime', message: 'A saída deve ocorrer após a entrada.' });
    }

    if (!!values.breakStart !== !!values.breakEnd) {
        return this.createError({ path: 'breakEnd', message: 'Informe o início e o fim do intervalo.' });
    }

    if (values.breakStart && values.breakEnd && isValidTime(values.breakStart) && isValidTime(values.breakEnd)) {
        
        let breakStart = toMinutes(values.breakStart);
        let breakEnd = toMinutes(values.breakEnd);

        if (values.endsNextDay && breakStart < start) breakStart += 1440;
        if (values.endsNextDay && breakEnd <= breakStart) breakEnd += 1440;

        if (breakStart < start || breakEnd <= breakStart || breakEnd > end) {
            return this.createError({ path: 'breakEnd', message: 'O intervalo deve estar dentro da jornada.' });
        }
        
    }

    return true;
});
