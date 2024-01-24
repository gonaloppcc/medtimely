import dayjs from 'dayjs';

export const formatDateToString = (date: Date): string => {
    const day = dayjs(date).format('DD MMMM YYYY');
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}, ${day}`;
};

export const formatDateToHoursMinutesString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
};
