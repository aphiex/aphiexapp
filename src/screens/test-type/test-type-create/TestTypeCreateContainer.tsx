import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { testTypeService } from '../../../services';
import theme from '../../../styles/theme';
import { MEASUREMENT_UNITS, ReferenceValueCreate } from '../../../utils';
import { TestTypeCreateView } from './TestTypeCreateView';

export function TestTypeCreateContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'TestTypeCreate'>) {
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
		ReferenceValueCreate[]
	>([]);

	const handleAddReference = () => {
		setReferenceValues(prevState => [
			...prevState,
			{
				condition: '',
				gender: 'A',
				maxAge: 0,
				maxValue: 0,
				minAge: 0,
				minValue: 0,
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

	const handleValidation = () => {
		if (!name) {
			setNameError('Informe um nome');
			return false;
		}
		if (!measurementUnit) {
			setMeasurementUnitError('Informe a unidade de medida');
			return false;
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
							navigation.navigate('Settings');
						},
					},
				]
			);
		} else navigation.navigate('Settings');
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
					.then(() => {
						Alert.alert(name, 'Tipo de exame criado com sucesso');
						navigation.replace('Settings');
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
			<ScreenContainer hasFooter hasPadding={false}>
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
