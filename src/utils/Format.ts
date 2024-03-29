export function fixDateTimezone(date: Date) {
	const userTimezoneOffset = date.getTimezoneOffset() * 60000;
	const newFixedDate = new Date(date.getTime() - userTimezoneOffset);
	return newFixedDate;
}

export function undoFixDateTimezone(date: Date) {
	const userTimezoneOffset = date.getTimezoneOffset() * 60000;
	const newFixedDate = new Date(date.getTime() + userTimezoneOffset);
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

export const formatQuantity = (value?: number) => {
	if (!value && value !== 0) return `-`;
	if (value === 0) return `0`;

	if (Number.isInteger(value)) {
		return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}

	const newValue = value
		.toFixed(2)
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
		.replace(/.([^.]*)$/, ',$1');

	// when newValue ends with 'x,00' remove the 0s
	if (
		newValue[newValue.length - 1] === '0' &&
		newValue[newValue.length - 2] === '0'
	)
		return newValue.substring(0, newValue.length - 3);

	// when newValue ends with 'X,X0' remove the 0
	if (newValue[newValue.length - 1] === '0')
		return newValue.substring(0, newValue.length - 1);

	return newValue;
};

export const dotToComma = (value?: string) => {
	if (value) return value.replace('.', ',');
	return value;
};

export const isAgeEmpty = (value?: number) => {
	if (value || value === 0) return false;

	return true;
};

export const ageClassification = (
	minAge?: number,
	maxAge?: number,
	gender?: string
) => {
	// 0 to 12 years
	if ((isAgeEmpty(minAge) || minAge === 0) && maxAge === 4380) return 'Criança';
	// 12 to 60 years if women
	if (minAge === 4381 && maxAge === 21899 && gender === 'F') return 'Adulto';
	// 12 to 65 years if men
	if (minAge === 4381 && maxAge === 23724 && (gender === 'M' || gender === 'A'))
		return 'Adulto';
	// over 60 years if women
	if (minAge === 21900 && isAgeEmpty(maxAge) && gender === 'F') return 'Idoso';
	// over 65 years if men
	if (
		minAge === 23725 &&
		isAgeEmpty(maxAge) &&
		(gender === 'M' || gender === 'A')
	)
		return 'Idoso';

	return undefined;
};

export const setTimeLabel = (minDays?: number, maxDays?: number) => {
	if (isAgeEmpty(minDays) && maxDays) {
		const years = maxDays / 365;
		if (Math.round(years) > 1) return 'anos';
		if (Math.round(years) === 1) return 'ano';

		const months = maxDays / 30;
		if (Math.round(months) > 1) return 'meses';
		if (Math.round(months) === 1) return 'mês';

		if (Math.round(maxDays) === 1) return 'dia';
		return 'dias';
	}

	if (minDays >= 0 && !maxDays) {
		const years = minDays / 365;
		if (Math.round(years) > 1) return 'anos';
		if (Math.round(years) === 1) return 'ano';

		const months = minDays / 30;
		if (Math.round(months) > 1) return 'meses';
		if (Math.round(months) === 1) return 'mês';

		if (Math.round(minDays) === 1) return 'dia';
		return 'dias';
	}

	if (minDays >= 0 && maxDays) {
		const minYears = minDays / 365;
		if (Math.round(minYears) >= 1) {
			const maxYears = maxDays / 365;
			if (Math.round(maxYears) === 1) return 'ano';
			return 'anos';
		}

		const minMonths = minDays / 30;
		if (Math.round(minMonths) >= 1) {
			const maxMonths = maxDays / 30;
			if (Math.round(maxMonths) === 1) return 'mês';
			return 'meses';
		}

		if (Math.round(maxDays) === 1) return 'dia';
	}

	return 'dias';
};

export const setTimeLabelEdit = (minDays?: number, maxDays?: number) => {
	if (isAgeEmpty(minDays) && maxDays) {
		const years = maxDays / 365;
		if (Math.round(years) > 1 && maxDays % 365 === 0) return 'anos';
		if (Math.round(years) === 1 && maxDays % 365 === 0) return 'ano';

		const months = maxDays / 30;
		if (Math.round(months) > 1 && maxDays % 30 === 0) return 'meses';
		if (Math.round(months) === 1 && maxDays % 30 === 0) return 'mês';

		if (Math.round(maxDays) === 1) return 'dia';
		return 'dias';
	}

	if (minDays >= 0 && !maxDays) {
		const years = minDays / 365;
		if (Math.round(years) > 1 && minDays % 365 === 0) return 'anos';
		if (Math.round(years) === 1 && minDays % 365 === 0) return 'ano';

		const months = minDays / 30;
		if (Math.round(months) > 1 && minDays % 30 === 0) return 'meses';
		if (Math.round(months) === 1 && minDays % 30 === 0) return 'mês';

		if (Math.round(minDays) === 1) return 'dia';
		return 'dias';
	}

	if (minDays >= 0 && maxDays) {
		const minYears = minDays / 365;
		if (
			Math.round(minYears) >= 1 &&
			minDays % 365 === 0 &&
			maxDays % 365 === 0
		) {
			const maxYears = maxDays / 365;
			if (Math.round(maxYears) === 1) return 'ano';
			return 'anos';
		}

		const minMonths = minDays / 30;
		if (
			Math.round(minMonths) >= 1 &&
			minDays % 30 === 0 &&
			maxDays % 30 === 0
		) {
			const maxMonths = maxDays / 30;
			if (Math.round(maxMonths) === 1) return 'mês';
			return 'meses';
		}

		if (Math.round(maxDays) === 1) return 'dia';
	}

	return 'dias';
};

export const setTimeValue = (days?: number, timeLabel?: string) => {
	if (timeLabel === 'ano' || timeLabel === 'anos')
		return Math.round(days / 365);
	if (timeLabel === 'mês' || timeLabel === 'meses')
		return Math.round(days / 30);
	return days;
};
