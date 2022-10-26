import React from 'react';

import {
	ageClassification,
	formatQuantity,
	isAgeEmpty,
	ReferenceValue,
	setTimeLabel,
	setTimeValue,
} from '../../../../../utils';
import { ReferenceTableView } from './ReferenceTableView';

export type TReferenceTableContainer = {
	referenceValues?: ReferenceValue[];
	measurementUnit?: string;
};

export const ReferenceTableContainer = ({
	referenceValues,
	measurementUnit,
}: TReferenceTableContainer) => {
	const handleShowGender = (gender: string) => {
		if (gender === 'M') return ' (M)';
		if (gender === 'F') return ' (F)';
		return '';
	};

	const handleShowValueRange = (minValue?: number, maxValue?: number) => {
		if (minValue === undefined && maxValue === undefined) return '-';
		if (!minValue && maxValue) return `abaixo de ${formatQuantity(maxValue)}`;
		if (minValue && !maxValue) return `acima de ${formatQuantity(minValue)}`;
		if (minValue === maxValue) return formatQuantity(minValue);
		return `${formatQuantity(minValue)} a ${formatQuantity(maxValue)}`;
	};

	const handleShowAge = (reference: ReferenceValue) => {
		const classification = ageClassification(
			reference?.minAge,
			reference?.maxAge,
			reference?.gender
		);

		const timeLabel = setTimeLabel(reference?.minAge, reference?.maxAge);

		if (classification) return classification;

		if (isAgeEmpty(reference?.minAge) && isAgeEmpty(reference?.maxAge))
			return 'Todas as idades';

		if (!reference?.minAge && reference?.maxAge)
			return `até ${setTimeValue(reference?.maxAge, timeLabel)} ${timeLabel}`;

		if (!isAgeEmpty(reference?.minAge) && !reference?.maxAge)
			return `acima de ${setTimeValue(
				reference?.minAge,
				timeLabel
			)} ${timeLabel}`;

		if (reference?.minAge === reference?.maxAge)
			return `${setTimeValue(reference?.minAge, timeLabel)} ${timeLabel}`;

		return `${setTimeValue(reference?.minAge, timeLabel)} a ${setTimeValue(
			reference?.maxAge,
			timeLabel
		)} ${timeLabel}`;
	};

	return (
		<ReferenceTableView
			referenceValues={referenceValues}
			measurementUnit={measurementUnit}
			handleShowGender={handleShowGender}
			handleShowValueRange={handleShowValueRange}
			handleShowAge={handleShowAge}
		/>
	);
};
