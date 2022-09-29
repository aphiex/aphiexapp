import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { cityService, testService, testTypeService } from '../../../services';
import theme from '../../../styles/theme';
import {
	Test,
	SelectItem,
	validateEmail,
	TestEdit,
	fixDateTimezone,
	TestType,
} from '../../../utils';
import { TestEditView } from './TestEditView';

export function TestEditContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'TestEdit'>) {
	const { testId } = route.params;
	const [test, setTest] = useState<Test>();

	const [description, setDescription] = useState<string>('');

	const [value, setValue] = useState<string>('');
	const [valueError, setValueError] = useState<string>('');

	const today = fixDateTimezone(new Date());
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
		let formatedValue = v.replace(/\s/g, '').replace(/\-/g, '');
		if (formatedValue[0] === '.' || formatedValue[0] === ',')
			formatedValue = '0' + formatedValue;
		setValue(formatedValue);
		if (valueError) setValueError('');
	};

	const handleFixValue = (v: string) => {
		if (v[v.length - 1] === '.' || v[v.length - 1] === ',') {
			const newValue = v.substring(0, v.length - 1);
			return newValue;
		}
		return v;
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
			value !== (test?.value ? test?.value : '') ||
				date?.toString() !== (test?.date ? test?.date : '') ||
				testType !== (test?.testType?.id ? test?.testType?.id : '') ||
				description !== (test?.description ? test?.description : '')
		);
	};

	const resetForm = () => {
		setDescription(test?.description || '');
		setValue(test?.value?.toString() || '');
		setValueError('');
		setDate(test?.date ? fixDateTimezone(new Date(test.date)) : today);
		setTestType(test?.testType?.id?.toString() || null);
		setTestTypeError('');
		setMeasurementUnit(test?.testType?.measurementUnit || '');
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
							navigation.navigate('TestDetail', { testId });
						},
					},
				]
			);
		} else navigation.navigate('TestDetail', { testId });
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
						setDescription(result?.description || '');
						setValue(result?.value?.toString() || '');
						setDate(
							result?.date ? fixDateTimezone(new Date(result.date)) : today
						);
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

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				testService
					.handleUpdateTest(
						{
							id: testId,
							description: description?.trim() || '',
							date: date?.toString() || '',
							image: '',
							condition: '',
							profileId: currentProfile?.id,
							testTypeId: testType ? parseInt(testType) : undefined,
							value: value ? handleFixValue(value) : undefined,
						},
						auth?.key || ''
					)
					.then(result => {
						Alert.alert('Exame atualizado com sucesso!');
						navigation.replace('TestDetail', { testId });
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
		}
	}, [testId]);

	return (
		<>
			<ScreenContainer hasFooter>
				<TestEditView
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