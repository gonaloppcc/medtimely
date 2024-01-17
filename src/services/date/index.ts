import dayjs from 'dayjs';

export const formateDateToString = (date: Date): string => {
    const day = dayjs(date).format('DD MMMM YYYY');
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} at ${hours}h:${minutes}`;
};
