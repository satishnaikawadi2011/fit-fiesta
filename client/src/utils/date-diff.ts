import dayjs from 'dayjs';

export const getDiff = (a: string, b: string) => {
	const d1 = dayjs(a);
	const d2 = dayjs(b);
	return d1.diff(d2, 'day');
};
