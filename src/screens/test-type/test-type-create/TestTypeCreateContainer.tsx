import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { testTypeService } from '../../../services';
import { referenceValueService } from '../../../services/ReferenceValueService';
import theme from '../../../styles/theme';
import {
	isInvalidAge,
	isInvalidMaxAge,
	isInvalidMinAge,
	isInvalidValue,
	isSameCondition,
	isSameGender,
	MEASUREMENT_UNITS,
	ReferenceValueCreation,
} from '../../../utils';
import { TestTypeCreateView } from './TestTypeCreateView';

export function TestTypeCreateContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'TestTypeCreate'>) {
	const scrollRef = useRef();
	const referenceOffset = 390;
	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');

	const [measurementUnit, setMeasurementUnit] = useState<string>('');
	const [measurementUnitError, setMeasurementUnitError] = useState<string>('');
	const measurementUnitList = MEASUREMENT_UNITS.map(item => {
		return { label: item, value: item };
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [openSelect, setOpenSelect] = useState<boolean>(false);

	const [referenceValues, setReferenceValues] = useState<
		ReferenceValueCreation[]
	>([]);

	const handleAddReference = () => {
		setReferenceValues(prevState => [
			...prevState,
			{
				condition: '',
				gender: 'A',
				maxAge: 0,
				maxValue: '0',
				minAge: 0,
				minValue: '0',
				conditionError: '',
				genderError: '',
				minValueError: '',
				maxValueError: '',
				minAgeError: '',
				maxAgeError: '',
				yOffset: 0,
				ageVariation: 'CUSTOM',
				time: 'DAY',
				timeVariation: 'BETWEEN',
				valueVariation: 'BETWEEN',
			},
		]);
	};

	const handleChangeName = (value: string) => {
		setName(value);
		if (nameError) setNameError('');
	};

	const handleChangeMeasurementUnit = (value: string) => {
		setMeasurementUnit(value);
		if (measurementUnitError) setMeasurementUnitError('');
	};

	const handleFixValue = (v?: string) => {
		if (v !== undefined) {
			let newValue = v;

			if (v[v.length - 1] === '.' || v[v.length - 1] === ',') {
				newValue = v.substring(0, v.length - 1);
			}

			return newValue.replace(',', '.');
		}
		return undefined;
	};

	const handleValidation = () => {
		if (!name) {
			setNameError('Informe um nome');
			// @ts-ignore
			scrollRef?.current?.scrollTo({
				x: 0,
				y: 0,
				animated: true,
			});
			Alert.alert(`Erro ao criar tipo de exame`, 'Informe um nome');
			return false;
		}
		if (!measurementUnit) {
			setMeasurementUnitError('Informe a unidade de medida');
			// @ts-ignore
			scrollRef?.current?.scrollTo({
				x: 0,
				y: 0,
				animated: true,
			});
			Alert.alert(`Erro ao criar tipo de exame`, 'Informe a unidade de medida');
			return false;
		}

		if (referenceValues?.length > 0) {
			let referenceErrorValidation = true;

			for (let indexA = referenceValues?.length - 1; indexA >= 0; indexA--) {
				if (isInvalidValue(referenceValues[indexA])) {
					setReferenceValues(prev =>
						prev.map((prevReference, prevIndex) => {
							if (prevIndex === indexA) {
								const newReference: ReferenceValueCreation = {
									...prevReference,
									minValueError:
										'O valor inicial não pode ser maior que o valor final',
									maxValueError:
										'O valor inicial não pode ser maior que o valor final',
								};
								return newReference;
							}
							return prevReference;
						})
					);
					// @ts-ignore
					scrollRef?.current?.scrollTo({
						x: 0,
						y: referenceValues[indexA]?.yOffset
							? referenceValues[indexA]?.yOffset + referenceOffset
							: 0,
						animated: true,
					});
					Alert.alert(
						`Erro no valor de referência #${indexA + 1}`,
						'O valor inicial não pode ser maior que o valor final'
					);
					referenceErrorValidation = false;
					indexA = -1;
					return;
				}
				if (isInvalidAge(referenceValues[indexA])) {
					setReferenceValues(prev =>
						prev.map((prevReference, prevIndex) => {
							if (prevIndex === indexA) {
								const newReference: ReferenceValueCreation = {
									...prevReference,
									minValueError:
										'A idade inicial não pode ser maior que a idade final',
									maxValueError:
										'A idade inicial não pode ser maior que a idade final',
								};
								return newReference;
							}
							return prevReference;
						})
					);
					// @ts-ignore
					scrollRef?.current?.scrollTo({
						x: 0,
						y: referenceValues[indexA]?.yOffset
							? referenceValues[indexA]?.yOffset + referenceOffset
							: 0,
						animated: true,
					});
					Alert.alert(
						`Erro no valor de referência #${indexA + 1}`,
						'A idade inicial não pode ser maior que a idade final'
					);
					referenceErrorValidation = false;
					indexA = -1;
					return;
				}

				for (let indexB = referenceValues?.length - 1; indexB >= 0; indexB--) {
					if (indexA !== indexB) {
						if (
							isSameCondition(
								referenceValues[indexA],
								referenceValues[indexB]
							) &&
							isSameGender(referenceValues[indexA], referenceValues[indexB])
						) {
							setReferenceValues(prev =>
								prev.map((prevReference, prevIndex) => {
									if (prevIndex === indexA) {
										const newReference: ReferenceValueCreation = {
											...prevReference,
											conditionError:
												'Não podem haver dois valores de referencia para a mesma condição e sexo',
											genderError:
												'Não podem haver dois valores de referencia para a mesma condição e sexo',
										};
										return newReference;
									}
									return prevReference;
								})
							);
							// @ts-ignore
							scrollRef?.current?.scrollTo({
								x: 0,
								y: referenceValues[indexA]?.yOffset
									? referenceValues[indexA]?.yOffset + referenceOffset
									: 0,
								animated: true,
							});
							Alert.alert(
								`Conflito entre os valores de referência #${indexA + 1} e #${
									indexB + 1
								}`,
								`Não podem haver dois valores de referencia para a mesma condição e sexo (Valores de Refêrencias #${
									indexA + 1
								} e #${indexB + 1})`
							);
							referenceErrorValidation = false;
							indexA = -1;
							indexB = -1;
							return;
						}
						if (
							isSameGender(referenceValues[indexA], referenceValues[indexB]) &&
							isInvalidMinAge(referenceValues[indexA], referenceValues[indexB])
						) {
							setReferenceValues(prev =>
								prev.map((prevReference, prevIndex) => {
									if (prevIndex === indexA) {
										const newReference: ReferenceValueCreation = {
											...prevReference,
											minAgeError: `A idade inicial informada já pertence ao intervalo de idade do Valor de Refêrencia #${
												indexB + 1
											} para o mesmo sexo`,
										};
										return newReference;
									}
									return prevReference;
								})
							);
							// @ts-ignore
							scrollRef?.current?.scrollTo({
								x: 0,
								y: referenceValues[indexA]?.yOffset
									? referenceValues[indexA]?.yOffset + referenceOffset
									: 0,
								animated: true,
							});
							Alert.alert(
								`Conflito entre os valores de referência #${indexA + 1} e #${
									indexB + 1
								}`,
								`A idade inicial informada no Valor de Refêrencia #${
									indexA + 1
								} já pertence ao intervalo de idade do Valor de Refêrencia #${
									indexB + 1
								} para o mesmo sexo`
							);
							referenceErrorValidation = false;
							indexA = -1;
							indexB = -1;
							return;
						}
						if (
							isSameGender(referenceValues[indexA], referenceValues[indexB]) &&
							isInvalidMaxAge(referenceValues[indexA], referenceValues[indexB])
						) {
							setReferenceValues(prev =>
								prev.map((prevReference, prevIndex) => {
									if (prevIndex === indexA) {
										const newReference: ReferenceValueCreation = {
											...prevReference,
											minAgeError: `A idade final informada já pertence ao intervalo de idade do Valor de Refêrencia #${
												indexB + 1
											} para o mesmo sexo`,
										};
										return newReference;
									}
									return prevReference;
								})
							);
							// @ts-ignore
							scrollRef?.current?.scrollTo({
								x: 0,
								y: referenceValues[indexA]?.yOffset
									? referenceValues[indexA]?.yOffset + referenceOffset
									: 0,
								animated: true,
							});
							Alert.alert(
								`Conflito entre os valores de referência #${indexA + 1} e #${
									indexB + 1
								}`,
								`A idade final informada no Valor de Refêrencia #${
									indexA + 1
								} já pertence ao intervalo de idade do Valor de Refêrencia #${
									indexB + 1
								} para o mesmo sexo`
							);
							referenceErrorValidation = false;
							indexA = -1;
							indexB = -1;
							return;
						}
					}
				}
			}
			return referenceErrorValidation;
		}

		return true;
	};

	const isFormDust = () => {
		return Boolean(name || measurementUnit || referenceValues?.length > 0);
	};

	const clearForm = () => {
		setName('');
		setNameError('');
		setMeasurementUnit('');
		setMeasurementUnitError('');
		setReferenceValues([]);
	};

	const handleCancel = () => {
		if (isFormDust()) {
			Alert.alert(
				'Criação em andamento',
				'Todas as informações inseridas serão perdidas. Deseja voltar mesmo assim?',
				[
					{
						text: 'Cancelar',
						onPress: () => {},
						style: 'cancel',
					},
					{
						text: 'Sim',
						onPress: () => {
							clearForm();
							navigation.goBack();
						},
					},
				]
			);
		} else navigation.goBack();
	};

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				testTypeService
					.handleCreateTestType({
						measurementUnit: measurementUnit?.trim() || '',
						name: name?.trim() || '',
					})
					.then(testTypeId => {
						if (referenceValues.length > 0) {
							let errors: number[] = [];
							referenceValues.forEach((reference, index) => {
								referenceValueService
									.handleCreateReferenceValue({
										condition: reference.condition,
										gender: reference.gender,
										maxAge: reference.maxAge,
										maxValue: handleFixValue(reference?.maxValue),
										minAge: reference.minAge,
										minValue: handleFixValue(reference?.minValue),
										testTypeId: testTypeId,
									})
									.catch(() => {
										errors.push(index + 1);
									})
									.finally(() => {
										if (index === referenceValues?.length - 1) {
											if (errors?.length > 0) {
												Alert.alert(
													name,
													`Tipo de exame criado com sucesso, entretanto houve erro ao cadastrar os seguintes valores de referência:
														${errors.map((errorNumber, errorIndex) => {
															return ` #${errorNumber}${
																errorIndex === errors?.length - 1 ? '' : ','
															}`;
														})}
													`
												);
											} else {
												Alert.alert(name, 'Tipo de exame criado com sucesso');
											}
											navigation.goBack();
										}
									});
							});
						} else {
							Alert.alert(name, 'Tipo de exame criado com sucesso');
							navigation.goBack();
						}
					})
					.catch(error => {
						Alert.alert(
							error?.message || error,
							'Reinicie o aplicativo e tente novamente.'
						);
						setLoading(false);
					});
			} catch (error: any) {
				Alert.alert(
					error?.message || error,
					'Reinicie o aplicativo e tente novamente.'
				);
				setLoading(false);
			}
		}
	};

	return (
		<>
			<ScreenContainer hasFooter hasPadding={false} scrollRef={scrollRef}>
				<TestTypeCreateView
					handleChangeName={handleChangeName}
					name={name}
					nameError={nameError}
					loading={loading}
					measurementUnit={measurementUnit}
					measurementUnitError={measurementUnitError}
					setMeasurementUnit={setMeasurementUnit}
					setMeasurementUnitError={setMeasurementUnitError}
					handleChangeMeasurementUnit={handleChangeMeasurementUnit}
					openSelect={openSelect}
					setOpenSelect={setOpenSelect}
					measurementUnitList={measurementUnitList}
					handleAddReference={handleAddReference}
					referenceValues={referenceValues}
					setReferenceValues={setReferenceValues}
				/>
			</ScreenContainer>
			<FooterContainer
				btnLeftTitle="Cancelar"
				btnLeftVariant="secondary"
				btnLeftOnPress={() => handleCancel()}
				btnLeftDisabled={loading}
				btnMiddleTitle="Limpar"
				btnMiddleOnPress={() => clearForm()}
				btnMiddleIcon={
					<Restart
						size={24}
						color={loading ? theme.colors.grey : theme.colors.black}
					/>
				}
				btnMiddleVariant="secondary"
				btnMiddleDisabled={loading}
				btnRightTitle="Criar"
				btnRightVariant="primary"
				btnRightOnPress={() => handleSubmit()}
				btnRightDisabled={loading || !isFormDust()}
			/>
		</>
	);
}
