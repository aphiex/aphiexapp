import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MEASUREMENT_UNITS, ReferenceValueCreation } from '../../../utils';
import { ReferenceValueView } from './ReferenceValueView';

type TReferenceValueContainer = {
	index: number;
	zIndex: number;
	measurementUnit: string;
	currentReferenceValue: ReferenceValueCreation;
	setReferenceValues: React.Dispatch<
		React.SetStateAction<ReferenceValueCreation[]>
	>;
};

export const ReferenceValueContainer = ({
	index,
	measurementUnit,
	zIndex,
	setReferenceValues,
	currentReferenceValue,
}: TReferenceValueContainer) => {
	const [openCondition, setOpenCondition] = useState<boolean>(false);
	const [openGender, setOpenGender] = useState<boolean>(false);
	const [openValueVariation, setOpenValueVariation] = useState<boolean>(false);
	const [openAge, setOpenAge] = useState<boolean>(false);
	const [openTimeVariation, setOpenTimeVariation] = useState<boolean>(false);
	const [openTime, setOpenTime] = useState<boolean>(false);

	const [ageVariation, setAgeVariation] = useState<string>('CUSTOM');
	const [timeVariation, setTimeVariation] = useState<string>('BETWEEN');
	const [valueVariation, setValueVariation] = useState<string>('BETWEEN');
	const [time, setTime] = useState<string>('DAY');

	const handleChangeCondition = (value: string) => {
		setAgeVariation('CUSTOM');
		setTime('DAY');
		setTimeVariation('BETWEEN');

		if (typeof value === 'string') {
			setReferenceValues(prev =>
				prev.map((prevReference, prevIndex) => {
					if (prevIndex === index) {
						const newReference: ReferenceValueCreation = {
							...prevReference,
							condition: value,
							conditionError: '',
							genderError: '',
							maxAge: value ? undefined : 0,
							minAge: value ? undefined : 0,
						};
						return newReference;
					}
					return prevReference;
				})
			);
		}
	};

	const handleChangeGender = (value: string) => {
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						gender: value,
						conditionError: '',
						genderError: '',
						minAge:
							ageVariation === 'CUSTOM'
								? prevReference.minAge
								: handleSetMinAge(ageVariation, value),
						maxAge:
							ageVariation === 'CUSTOM'
								? prevReference.maxAge
								: handleSetMaxAge(ageVariation, value),
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeValueVariation = (value: string) => {
		setValueVariation(value);

		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						minValue: value === 'OR_LESS' ? undefined : '0',
						maxValue: value === 'OR_MORE' ? undefined : '0',
						minValueError: '',
						maxValueError: '',
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleSetMinAge = (value: string, gender: string) => {
		if (value === 'CUSTOM') return 0;
		if (value === 'ADULT') return 4381;
		if (value === 'ELDER' && gender === 'F') return 21900;
		if (value === 'ELDER' && gender !== 'F') return 23725;

		return undefined;
	};

	const handleSetMaxAge = (value: string, gender: string) => {
		if (value === 'CUSTOM') return 0;
		if (value === 'CHILD') return 4380;
		if (value === 'ADULT' && gender === 'F') return 21899;
		if (value === 'ADULT' && gender !== 'F') return 23724;

		return undefined;
	};

	const handleChangeAgeVariation = (value: string) => {
		setAgeVariation(value);
		setTime('DAY');
		setTimeVariation('BETWEEN');

		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						minAge: handleSetMinAge(value, prevReference?.gender),
						maxAge: handleSetMaxAge(value, prevReference?.gender),
						minAgeError: '',
						maxAgeError: '',
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeTimeVariation = (value: string) => {
		setTimeVariation(value);

		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						minAge: value === 'OR_LESS' ? undefined : 0,
						maxAge: value === 'OR_MORE' ? undefined : 0,
						minAgeError: '',
						maxAgeError: '',
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeMinValue = (value?: string) => {
		let formatedValue = value
			.replace(/\s/g, '')
			.replace(/\-/g, '')
			.replace(/\./g, '');
		if (formatedValue[0] === ',') formatedValue = '0' + formatedValue;
		if (
			formatedValue[0] === '0' &&
			formatedValue[1] &&
			formatedValue[1] !== ','
		)
			formatedValue = formatedValue?.substring(1);

		const onlyOneComma = Boolean(formatedValue.split(',')?.length - 1 < 2);

		if (onlyOneComma)
			setReferenceValues(prev =>
				prev.map((prevReference, prevIndex) => {
					if (prevIndex === index) {
						const newReference: ReferenceValueCreation = {
							...prevReference,
							minValue: formatedValue,
							minAgeError: '',
							maxAgeError: '',
						};
						return newReference;
					}
					return prevReference;
				})
			);
	};

	const handleChangeMaxValue = (value?: string) => {
		let formatedValue = value
			.replace(/\s/g, '')
			.replace(/\-/g, '')
			.replace(/\./g, '');
		if (formatedValue[0] === ',') formatedValue = '0' + formatedValue;
		if (
			formatedValue[0] === '0' &&
			formatedValue[1] &&
			formatedValue[1] !== ','
		)
			formatedValue = formatedValue?.substring(1);

		const onlyOneComma = Boolean(formatedValue.split(',')?.length - 1 < 2);

		if (onlyOneComma)
			setReferenceValues(prev =>
				prev.map((prevReference, prevIndex) => {
					if (prevIndex === index) {
						const newReference: ReferenceValueCreation = {
							...prevReference,
							maxValue: formatedValue,
							minAgeError: '',
							maxAgeError: '',
						};
						return newReference;
					}
					return prevReference;
				})
			);
	};

	const handleDelete = () => {
		Alert.alert(
			'Remover valor de referência',
			'Deseja apagar este valor de referência?',
			[
				{
					text: 'Cancelar',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Sim',
					onPress: () => {
						setReferenceValues(prev =>
							prev.filter((_, prevIndex) => prevIndex !== index)
						);
					},
				},
			]
		);
	};

	const handleFormatAge = (value: number) => {
		if (time === 'YEAR') return (value / 365)?.toString();
		if (time === 'MONTH') return (value / 30)?.toString();
		return value?.toString();
	};

	const handleUnformatAge = (value: string) => {
		if (time === 'YEAR') return Number(value) * 365;
		if (time === 'MONTH') return Number(value) * 30;
		return Number(value);
	};

	const handleChangeMinAge = (value?: number) => {
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						minAge: value,
						minAgeError: '',
						maxAgeError: '',
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeMaxAge = (value?: number) => {
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						maxAge: value,
						minAgeError: '',
						maxAgeError: '',
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleSetYOffset = (value?: number) => {
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreation = {
						...prevReference,
						yOffset: value,
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	return (
		<ReferenceValueView
			currentReferenceValue={currentReferenceValue}
			index={index}
			zIndex={zIndex}
			measurementUnit={measurementUnit}
			handleDelete={handleDelete}
			handleChangeCondition={handleChangeCondition}
			openCondition={openCondition}
			setOpenCondition={setOpenCondition}
			handleChangeGender={handleChangeGender}
			openGender={openGender}
			setOpenGender={setOpenGender}
			openValueVariation={openValueVariation}
			setOpenValueVariation={setOpenValueVariation}
			valueVariation={valueVariation}
			setValueVariation={setValueVariation}
			handleChangeValueVariation={handleChangeValueVariation}
			handleChangeMinValue={handleChangeMinValue}
			handleChangeMaxValue={handleChangeMaxValue}
			openAge={openAge}
			setOpenAge={setOpenAge}
			ageVariation={ageVariation}
			setAgeVariation={setAgeVariation}
			handleChangeAgeVariation={handleChangeAgeVariation}
			openTimeVariation={openTimeVariation}
			setOpenTimeVariation={setOpenTimeVariation}
			timeVariation={timeVariation}
			setTimeVariation={setTimeVariation}
			handleChangeTimeVariation={handleChangeTimeVariation}
			openTime={openTime}
			setOpenTime={setOpenTime}
			time={time}
			setTime={setTime}
			handleFormatAge={handleFormatAge}
			handleUnformatAge={handleUnformatAge}
			handleChangeMinAge={handleChangeMinAge}
			handleChangeMaxAge={handleChangeMaxAge}
			handleSetYOffset={handleSetYOffset}
		/>
	);
};
