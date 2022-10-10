import React, { useState } from 'react';
import { Alert } from 'react-native';
import { MEASUREMENT_UNITS, ReferenceValueCreate } from '../../../utils';
import { ReferenceValueView } from './ReferenceValueView';

type TReferenceValueContainer = {
	index: number;
	currentReferenceValue: ReferenceValueCreate;
	referenceValues: ReferenceValueCreate[];
	setReferenceValues: React.Dispatch<
		React.SetStateAction<ReferenceValueCreate[]>
	>;
};

export const ReferenceValueContainer = ({
	index,
	referenceValues,
	setReferenceValues,
	currentReferenceValue,
}: TReferenceValueContainer) => {
	const [openCondition, setOpenCondition] = useState<boolean>(false);
	const [openGender, setOpenGender] = useState<boolean>(false);
	const [openValueVariation, setOpenValueVariation] = useState<boolean>(false);

	const [valueVariation, setValueVariation] = useState<string>('BETWEEN');

	const handleChangeCondition = (value: string) => {
		console.log('handleChangeCondition');
		if (typeof value == 'string') {
			setReferenceValues(prev =>
				prev.map((prevReference, prevIndex) => {
					if (prevIndex === index) {
						const newReference: ReferenceValueCreate = {
							...prevReference,
							condition: value,
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
		console.log('handleChangeGender');
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreate = {
						...prevReference,
						gender: value,
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeValueVariation = (value: string) => {
		console.log('handleChangeValueVariation');
		setValueVariation(value);
		if (value === 'AGE_OVER') console.log('bumbum');
		if (value === 'AGE_UNDER') console.log('popo');

		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreate = {
						...prevReference,
						minValue: value === 'AGE_UNDER' ? undefined : 0,
						maxValue: value === 'AGE_OVER' ? undefined : 0,
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeMinValue = (value?: number) => {
		console.log('handleChangeMinValue');
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreate = {
						...prevReference,
						minValue: value,
					};
					return newReference;
				}
				return prevReference;
			})
		);
	};

	const handleChangeMaxValue = (value?: number) => {
		console.log('handleChangeMaxValue');
		setReferenceValues(prev =>
			prev.map((prevReference, prevIndex) => {
				if (prevIndex === index) {
					const newReference: ReferenceValueCreate = {
						...prevReference,
						maxValue: value,
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

	return (
		<ReferenceValueView
			currentReferenceValue={currentReferenceValue}
			index={index}
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
		/>
	);
};
