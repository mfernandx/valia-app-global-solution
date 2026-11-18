import type { CreateWorkShiftRequest, WorkShiftFormData } from '../models/workShift';

function parseDate(date: string, time: string, dayOffset = 0): Date {
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(year, month - 1, day + dayOffset, hours, minutes);
}

function toDateTimeOffset(date: Date): string {
    const pad = (value: number) => String(value).padStart(2, '0');
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetRemainder = Math.abs(offsetMinutes) % 60;

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00${sign}${pad(offsetHours)}:${pad(offsetRemainder)}`;
}

export function buildWorkShiftRequest(data: WorkShiftFormData): CreateWorkShiftRequest {
    
    const start = parseDate(data.date, data.startTime);
    const end = parseDate(data.date, data.endTime, data.endsNextDay ? 1 : 0);

    let breakStart: Date | null = null;
    let breakEnd: Date | null = null;

    if (data.breakStart && data.breakEnd) {
        breakStart = parseDate(data.date, data.breakStart);
        breakEnd = parseDate(data.date, data.breakEnd);

        if (data.endsNextDay && breakStart < start) breakStart = parseDate(data.date, data.breakStart, 1);
        if (data.endsNextDay && breakEnd <= breakStart) breakEnd = parseDate(data.date, data.breakEnd, 1);
    }

    return {
        employmentId: data.employmentId,
        startTime: toDateTimeOffset(start),
        endTime: toDateTimeOffset(end),
        breakStart: breakStart ? toDateTimeOffset(breakStart) : null,
        breakEnd: breakEnd ? toDateTimeOffset(breakEnd) : null,
        notes: data.notes.trim() || null,
    };
}
