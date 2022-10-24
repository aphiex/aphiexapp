import { ReferenceValueCreate } from './types';

export interface ReferenceValueCreation extends ReferenceValueCreate {
	conditionError?: string;
	genderError?: string;
	minValueError?: string;
	maxValueError?: string;
	minAgeError?: string;
	maxAgeError?: string;
	yOffset?: number;
}

export const isSameCondition = (
	referenceA: ReferenceValueCreation,
	referenceB: ReferenceValueCreation
) => {
	return Boolean(
		referenceA?.condition &&
			referenceB?.condition &&
			referenceA?.condition === referenceB?.condition
	);
};

export const isSameGender = (
	referenceA: ReferenceValueCreation,
	referenceB: ReferenceValueCreation
) => {
	return Boolean(
		referenceA?.gender === referenceB?.gender ||
			referenceA?.gender === 'A' ||
			referenceB?.gender === 'A'
	);
};

export const isInvalidValue = (reference: ReferenceValueCreation) => {
	return Boolean(
		reference?.minValue &&
			reference?.maxValue &&
			reference?.minValue > reference?.maxValue
	);
};

export const isInvalidAge = (reference: ReferenceValueCreation) => {
	return Boolean(
		reference?.minAge &&
			reference?.maxAge &&
			reference?.minAge > reference?.maxAge
	);
};

export const isInvalidMinAge = (
	referenceA: ReferenceValueCreation, // referenceA min age is between referenceB min age and referenceB max age
	referenceB: ReferenceValueCreation
) => {
	return Boolean(
		// has no condition
		!referenceA?.condition &&
			!referenceB?.condition &&
			// same minAge
			(referenceA?.minAge === referenceB?.minAge ||
				// referenceA minAge is between referenceB minAge & referenceB maxAge when both exist
				(referenceA?.minAge &&
					referenceB?.minAge &&
					referenceB?.maxAge &&
					referenceA?.minAge >= referenceB?.minAge &&
					referenceA?.minAge <= referenceB?.maxAge) ||
				// referenceA minAge is above referenceB minAge when referenceB maxAge don't exist
				(referenceA?.minAge &&
					referenceB?.minAge &&
					!referenceB?.maxAge &&
					referenceA?.minAge >= referenceB?.minAge) ||
				// referenceA minAge is below referenceB maxAge when referenceB minAge don't exist
				(referenceA?.minAge &&
					!referenceB?.minAge &&
					referenceB?.maxAge &&
					referenceA?.minAge <= referenceB?.maxAge) ||
				(referenceA?.minAge && !referenceB?.minAge && !referenceB?.maxAge))
	);
};

export const isInvalidMaxAge = (
	referenceA: ReferenceValueCreation,
	referenceB: ReferenceValueCreation
) => {
	return Boolean(
		// has no condition
		!referenceA?.condition &&
			!referenceB?.condition &&
			// same maxAge
			(referenceA?.maxAge === referenceB?.maxAge ||
				// referenceA maxAge is between referenceB minAge & referenceB maxAge when both exist
				(referenceA?.maxAge &&
					referenceB?.minAge &&
					referenceB?.maxAge &&
					referenceA?.maxAge >= referenceB?.minAge &&
					referenceA?.maxAge <= referenceB?.maxAge) ||
				// referenceA maxAge is above referenceB minAge when referenceB maxAge don't exist
				(referenceA?.maxAge &&
					referenceB?.minAge &&
					!referenceB?.maxAge &&
					referenceA?.maxAge >= referenceB?.minAge) ||
				// referenceA maxAge is below referenceB maxAge when referenceB minAge don't exist
				(referenceA?.maxAge &&
					!referenceB?.minAge &&
					referenceB?.maxAge &&
					referenceA?.maxAge <= referenceB?.maxAge) ||
				(referenceA?.maxAge && !referenceB?.minAge && !referenceB?.maxAge))
	);
};
