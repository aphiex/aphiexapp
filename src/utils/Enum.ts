import { SelectItem } from './types';

export const MEASUREMENT_UNITS = [
	'µg/dL',
	'µUI/mL',
	'ng/dL',
	'mg/kg/24h',
	'mg/dL',
	'mg/24h',
	'mL/min/1,73m^2',
	'mEq/L',
	'mEq/24h',
	'g/dL',
	'g/24h',
	'U/dL',
	'U/L',
];

export const CONDITIONS_SELECT_LIST: SelectItem[] = [
	{ label: 'Nenhum (padrão)', value: '' },
	{ label: 'Cordão Umbilical', value: 'Cordão Umbilical' },
	{ label: 'Gestante', value: 'Gestante' },
	{ label: 'Lactente', value: 'Lactente' },
	{ label: 'Prematuro', value: 'Prematuro' },
];

export const GENDER_SELECT_LIST: SelectItem[] = [
	{ label: 'Todos', value: 'A' },
	{ label: 'Feminino', value: 'F' },
	{ label: 'Masculino', value: 'M' },
];

export const AGE_SELECT_LIST: SelectItem[] = [
	{ label: 'Definir intervalo', value: 'CUSTOM' },
	{ label: 'Todas as idades', value: 'ALL' },
	{ label: 'Criança', value: 'CHILD' },
	{ label: 'Adulto', value: 'ADULT' },
	{ label: 'Idoso', value: 'ELDER' },
];

export const VARIATION_SELECT_LIST: SelectItem[] = [
	{ label: 'a', value: 'BETWEEN' },
	{ label: 'ou mais', value: 'OR_MORE' },
	{ label: 'ou menos', value: 'OR_LESS' },
];

export const TIME_SELECT_LIST: SelectItem[] = [
	{ label: 'Dias', value: 'DAY' },
	{ label: 'Meses', value: 'MONTH' },
	{ label: 'Anos', value: 'YEAR' },
];
