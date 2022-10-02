export function fixDateTimezone(date: Date) {
	const userTimezoneOffset = date.getTimezoneOffset() * 60000;
	const newFixedDate = new Date(date.getTime() - userTimezoneOffset);
	return newFixedDate;
}

export function formatDate(day: number, month: number, year: number) {
	let formatedDate = '';
	if (day < 10) formatedDate += '0';
	formatedDate += day.toString() + '/';
	if (month < 10) formatedDate += '0';
	formatedDate += month.toString() + '/';
	formatedDate += year.toString();
	return formatedDate;
}

export function dateMask(date?: Date) {
	if (!date) return '';
	const newFixedDate = fixDateTimezone(date);
	const day = newFixedDate.getDate();
	const month = newFixedDate.getMonth() + 1;
	const year = newFixedDate.getFullYear();
	const dataFormatada = formatDate(day, month, year);
	return dataFormatada;
}

export function shortDateMask(date?: Date) {
	if (!date) return '';
	const newFixedDate = fixDateTimezone(date);
	const day = newFixedDate.getDate();
	const month = newFixedDate.getMonth() + 1;
	const year = Number(newFixedDate.getFullYear().toString().slice(-2));
	const dataFormatada = formatDate(day, month, year);
	return dataFormatada;
}

export function getToday() {
	const newDate = new Date();
	return fixDateTimezone(newDate);
}

export function formatGender(gender: string) {
	if (gender === 'M') return 'Masculino';
	if (gender === 'F') return 'Feminino';
	return '';
}

export function formatAgeInDays(birthdate: Date, finalDate: Date) {
	return Math.ceil(
		Math.abs(birthdate.getTime() - finalDate.getTime()) / (1000 * 3600 * 24)
	);
}
