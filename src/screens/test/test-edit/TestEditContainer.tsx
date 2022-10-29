import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { imageService, testService, testTypeService } from '../../../services';
import { referenceValueService } from '../../../services/ReferenceValueService';
import theme from '../../../styles/theme';
import {
	Test,
	SelectItem,
	TestType,
	ReferenceValue,
	dotToComma,
} from '../../../utils';
import { TestEditView } from './TestEditView';

export function TestEditContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'TestEdit'>) {
	const { testId } = route.params;
	const [test, setTest] = useState<Test>();

	const [condition, setCondition] = useState<string>('');
	const [referenceValues, setreferenceValues] = useState<ReferenceValue[]>([]);
	const [referenceLoading, setreferenceLoading] = useState<boolean>(false);

	const [description, setDescription] = useState<string>('');

	const [images, setImages] = useState<string[]>([]);
	const [initialImages, setInitialImages] = useState<string[]>([]);
	const [loadingImages, setLoadingImages] = useState<boolean>(false);

	const [value, setValue] = useState<string>('');
	const [valueError, setValueError] = useState<string>('');

	const today = new Date();
	const [date, setDate] = useState<Date>(today);

	const [testType, setTestType] = useState<string | null>(null);
	const [testTypeError, setTestTypeError] = useState<string>('');
	const [measurementUnit, setMeasurementUnit] = useState<string>('');

	const [testTypesList, setTestTypesList] = useState<SelectItem[]>([]);
	const [testTypes, setTestTypes] = useState<TestType[]>([]);

	const [loading, setLoading] = useState<boolean>(false);
	const [loadingTestTypes, setLoadingTestTypes] = useState<boolean>(false);

	const [openTestTypeDropdown, setOpenTestTypeDropdown] =
		useState<boolean>(false);

	const { currentProfile } = useProfile();
	const { auth } = useAuth();

	const handleChangeValue = (v: string) => {
		let formatedValue = v
			.replace(/\s/g, '')
			.replace(/\-/g, '')
			.replace(/\./g, '');
		if (formatedValue[0] === ',') formatedValue = '0' + formatedValue;
		if (
			formatedValue[0] === '0' &&
			formatedValue[1] &&
			formatedValue[1] !== ','
		)
			formatedValue = formatedValue.substring(1);

		const onlyOneComma = Boolean(formatedValue.split(',').length - 1 < 2);

		if (onlyOneComma) setValue(formatedValue);

		if (valueError) setValueError('');
	};

	const handleAddImage = (uri: string) => {
		setImages(prevState => [...prevState, uri]);
	};

	const handleRemoveImage = (index: number) => {
		setImages(prev => prev.filter((_, prevIndex) => prevIndex !== index));
	};

	const handleFixValue = (v: string) => {
		let newValue = v;

		if (v[v.length - 1] === '.' || v[v.length - 1] === ',') {
			newValue = v.substring(0, v.length - 1);
		}

		return newValue.replace(',', '.');
	};

	const handleChangeMeasurementUnit = (testTypeId: string) => {
		const currentTestType = testTypes?.find(
			test => parseInt(testTypeId) === test.id
		);
		setValue('');
		setMeasurementUnit(currentTestType?.measurementUnit || '');
	};

	const handleChangeDescription = (v: string) => {
		setDescription(v);
	};

	const handleChangeCondition = (v: string) => {
		if (v === condition) setCondition('');
		else setCondition(v);
	};

	const handleValidation = () => {
		if (!testType) {
			setTestTypeError('Selecione um tipo de exame');
			return false;
		}

		if (!value) {
			setValueError('Informe um valor');
			return false;
		}

		return true;
	};

	const handleDustImages = () => {
		if (initialImages?.length === 0 && images?.length === 0) return false;
		if (initialImages?.length !== images?.length) return true;

		let result = false;
		for (let index = 0; index < initialImages?.length; index++) {
			if (images[index] !== initialImages[index]) {
				result = true;
				return;
			}
		}
		return result;
	};

	const isFormDust = () => {
		return Boolean(
			value !== (test?.value ? dotToComma(test?.value.toString()) : '') ||
				date?.toISOString() !==
					(test?.date ? test?.date : today.toISOString()) ||
				testType !==
					(test?.testType?.id ? test?.testType?.id.toString() : '') ||
				condition !== (test?.condition ? test?.condition : '') ||
				description !== (test?.description ? test?.description : '') ||
				handleDustImages()
		);
	};

	const resetForm = () => {
		setDescription(test?.description || '');
		setValue(test?.value ? dotToComma(test?.value?.toString()) : '');
		setValueError('');
		setDate(test?.date ? new Date(test.date) : today);
		setTestType(test?.testType?.id?.toString() || null);
		setTestTypeError('');
		setMeasurementUnit(test?.testType?.measurementUnit || '');
		setCondition(test?.condition || '');
		setImages(initialImages);
	};

	const handleCancel = () => {
		if (isFormDust()) {
			Alert.alert(
				'Edição em andamento',
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
							resetForm();
							navigation.goBack();
						},
					},
				]
			);
		} else navigation.goBack();
	};

	const handleGetTestTypes = () => {
		setLoadingTestTypes(true);
		try {
			testTypeService
				.handleGetTestTypes()
				.then(result => {
					setTestTypes(result);
					const testTypesListFormat: SelectItem[] = [];
					result.forEach(test => {
						testTypesListFormat.push({
							label: test?.name || '',
							value: test?.id ? test.id.toString() : '',
						});
					});
					setTestTypesList(testTypesListFormat);
					setLoadingTestTypes(false);
				})
				.catch(error => {
					Alert.alert(error?.message || error, 'Tente novamente.');
					setLoadingTestTypes(false);
				});
		} catch (error: any) {
			Alert.alert(error?.message || error, 'Tente novamente.');
			setLoadingTestTypes(false);
		}
	};

	const handleGetTest = (id: number) => {
		setLoading(true);
		try {
			if (id && auth?.key) {
				testService
					.handleGetTestById(id, auth?.key, currentProfile?.id)
					.then(result => {
						setTest(result);
						setCondition(result?.condition || '');
						setDescription(result?.description || '');
						setValue(result?.value ? dotToComma(result?.value.toString()) : '');
						setDate(result?.date ? new Date(result.date) : today);
						setTestType(result?.testType?.id?.toString() || null);
						setMeasurementUnit(result?.testType?.measurementUnit || '');
						setLoading(false);
					})
					.catch(error => {
						Alert.alert(
							error?.message || error,
							'Reinicie o aplicativo e tente novamente.'
						);
						setLoading(false);
					});
			} else {
				throw new Error('Não foi possível carregar as informações');
			}
		} catch (error: any) {
			Alert.alert(
				error?.message || error,
				'Reinicie o aplicativo e tente novamente.'
			);
			setLoading(false);
		}
	};

	const getTestImages = (id: number) => {
		setLoadingImages(true);
		if (id && auth?.key) {
			imageService
				.handleGetImagesByTest(id, auth?.key)
				.then(result => {
					if (result?.length > 0) {
						setInitialImages(
							result?.map(img => {
								return img?.uri;
							})
						);
						setImages(
							result?.map(img => {
								return img?.uri;
							})
						);
					} else {
						setInitialImages([]);
						setImages([]);
					}
					setLoadingImages(false);
				})
				.catch(error => {
					Alert.alert(
						error?.message || error,
						'Reinicie o aplicativo e tente novamente.'
					);
					setLoadingImages(false);
				});
		}
	};

	const handleGetReferenceValues = (testTypeId: string) => {
		setreferenceLoading(true);
		try {
			referenceValueService
				.handleGetReferenceConditionsByTestType(parseInt(testTypeId))
				.then(result => {
					setreferenceValues(result);
					setreferenceLoading(false);
				})
				.catch(() => {
					setreferenceLoading(false);
					setCondition('');
					setreferenceValues([]);
				});
		} catch {
			setreferenceLoading(false);
			setCondition('');
			setreferenceValues([]);
		}
	};

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				testService
					.handleUpdateTest(
						{
							id: testId,
							description: description?.trim() || '',
							date: date?.toISOString() || '',
							hasImage: images?.length > 0 ? 'Y' : 'N',
							profileId: currentProfile?.id,
							testTypeId: testType ? parseInt(testType) : undefined,
							value: value ? handleFixValue(value) : undefined,
							condition,
						},
						auth?.key || ''
					)
					.then(() => {
						imageService
							.handleDeleteImagesByTestId(testId)
							.then(() => {
								if (images.length > 0) {
									let errors: number[] = [];
									images.forEach((image, index) => {
										imageService
											.handleCreateImage(
												{
													testId,
													uri: image,
												},
												auth.key
											)
											.catch(() => {
												errors.push(index + 1);
											})
											.finally(() => {
												if (index === images?.length - 1) {
													if (errors?.length > 0) {
														Alert.alert(
															'Exame atualizado com sucesso',
															'Entretanto houve erro ao cadastrar uma ou mais imagens'
														);
													} else {
														Alert.alert('Exame atualizado com sucesso');
													}
													navigation.goBack();
												}
											});
									});
								} else {
									Alert.alert('Exame atualizado com sucesso');
									navigation.goBack();
								}
							})
							.catch(error => {
								Alert.alert(
									'Erro ao atualizar Valores de Referência',
									'Reinicie o aplicativo e tente novamente.'
								);
								setLoading(false);
							});
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

	useEffect(() => {
		if (testId) {
			handleGetTestTypes();
			handleGetTest(testId);
			getTestImages(testId);
		}
	}, [testId]);

	useEffect(() => {
		if (testType) handleGetReferenceValues(testType);
	}, [testType]);

	return (
		<>
			<ScreenContainer hasFooter>
				<TestEditView
					handleChangeValue={handleChangeValue}
					handleChangeDescription={handleChangeDescription}
					description={description}
					value={value}
					valueError={valueError}
					loading={loading || loadingTestTypes || loadingImages}
					openTestTypeDropdown={openTestTypeDropdown}
					setOpenTestTypeDropdown={setOpenTestTypeDropdown}
					testType={testType}
					setTestType={setTestType}
					testTypesList={testTypesList}
					testTypeError={testTypeError}
					setTestTypeError={setTestTypeError}
					date={date}
					setDate={setDate}
					measurementUnit={measurementUnit}
					handleChangeMeasurementUnit={handleChangeMeasurementUnit}
					handleChangeCondition={handleChangeCondition}
					condition={condition}
					referenceValues={referenceValues}
					referenceLoading={referenceLoading}
					images={images}
					handleAddImage={handleAddImage}
					handleRemoveImage={handleRemoveImage}
				/>
			</ScreenContainer>
			<FooterContainer
				btnLeftTitle="Cancelar"
				btnLeftVariant="secondary"
				btnLeftOnPress={() => handleCancel()}
				btnLeftDisabled={loading}
				btnMiddleTitle="Restaurar"
				btnMiddleOnPress={() => resetForm()}
				btnMiddleIcon={
					<Restart
						size={24}
						color={loading ? theme.colors.grey : theme.colors.black}
					/>
				}
				btnMiddleVariant="secondary"
				btnMiddleDisabled={loading}
				btnRightTitle="Confirmar"
				btnRightVariant="primary"
				btnRightOnPress={() => handleSubmit()}
				btnRightDisabled={loading || !isFormDust()}
			/>
		</>
	);
}
