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
import { ReferenceValue, SelectItem, TestType } from '../../../utils';
import { TestCreateView } from './TestCreateView';

export function TestCreateContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'TestCreate'>) {
	const [description, setDescription] = useState<string>('');
	const [images, setImages] = useState<string[]>([]);

	const [condition, setCondition] = useState<string>('');
	const [referenceValues, setreferenceValues] = useState<ReferenceValue[]>([]);
	const [referenceLoading, setreferenceLoading] = useState<boolean>(false);

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

	const isFormDust = () => {
		return Boolean(
			value ||
				today !== date ||
				testType ||
				description ||
				condition ||
				images?.length > 0
		);
	};

	const clearForm = () => {
		setDescription('');
		setValue('');
		setValueError('');
		setDate(today);
		setTestType(null);
		setTestTypeError('');
		setMeasurementUnit('');
		setCondition('');
		setreferenceValues([]);
		setImages([]);
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
					.handleCreateTest(
						{
							description: description?.trim() || '',
							date: date?.toISOString() || '',
							profileId: currentProfile?.id,
							testTypeId: testType ? parseInt(testType) : undefined,
							value: value ? handleFixValue(value) : undefined,
							condition,
							hasImage: images?.length > 0 ? 'Y' : 'N',
						},
						auth.key
					)
					.then(testId => {
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
													'Criação finalizada',
													'Exame criado com sucesso, entretanto houve erro ao cadastrar uma ou mais imagens'
												);
											} else {
												Alert.alert(
													'Criação finalizada',
													'Exame criado com sucesso'
												);
											}
											navigation.goBack();
										}
									});
							});
						} else {
							Alert.alert('Criação finalizada', 'Exame criado com sucesso');
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

	useEffect(() => {
		handleGetTestTypes();
	}, []);

	useEffect(() => {
		if (testType) handleGetReferenceValues(testType);
	}, [testType]);

	return (
		<>
			<ScreenContainer hasFooter>
				<TestCreateView
					handleChangeValue={handleChangeValue}
					handleChangeDescription={handleChangeDescription}
					description={description}
					value={value}
					valueError={valueError}
					loading={loading || loadingTestTypes}
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
