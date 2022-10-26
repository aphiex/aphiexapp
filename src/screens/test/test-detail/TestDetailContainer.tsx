import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AccountEdit } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { testService } from '../../../services';
import { referenceValueService } from '../../../services/ReferenceValueService';
import theme from '../../../styles/theme';
import { ReferenceValue, Test } from '../../../utils';
import { TestDetailView } from './TestDetailView';

export function TestDetailContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'TestDetail'>) {
	const { auth } = useAuth();
	const { currentProfile } = useProfile();
	const { testId } = route.params;
	const [test, setTest] = useState<Test>();
	const [referenceValues, setReferenceValues] = useState<ReferenceValue[]>([]);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleGoToEditProfile = () => {
		navigation.navigate('ProfileEdit');
	};

	const handleEdit = () => {
		navigation.navigate('TestEdit', { testId: testId });
	};

	const getTest = (id: number) => {
		setLoading(true);
		try {
			if (id && auth?.key) {
				testService
					.handleGetTestById(id, auth?.key, currentProfile?.id)
					.then(result => {
						setTest(result);

						referenceValueService
							.handleGetReferenceValueByTestType(result?.testType?.id)
							.then(result => {
								setReferenceValues(result);
								setLoading(false);
							})
							.catch(() => {
								setReferenceValues([]);
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

	const handleDelete = () => {
		if (testId) {
			setLoading(true);
			try {
				testService
					.handleDeleteTest(testId)
					.then(() => {
						Alert.alert('Exame deletado com sucesso!');
						navigation.goBack();
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
		getTest(testId);
		const willFocusSubscription = navigation.addListener('focus', () => {
			getTest(testId);
		});

		return willFocusSubscription;
	}, []);

	return (
		<>
			<ScreenContainer hasFooter hasPadding={false}>
				<TestDetailView
					test={test}
					handleDelete={handleDelete}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					loading={loading}
					referenceValues={referenceValues}
					handleGoToEditProfile={handleGoToEditProfile}
				/>
			</ScreenContainer>
			<FooterContainer
				btnLeftTitle="Voltar"
				btnLeftVariant="secondary"
				btnLeftOnPress={() => handleGoBack()}
				btnRightTitle="Editar"
				btnRightVariant="primary"
				btnRightIcon={<AccountEdit size={18} color={theme.colors.white} />}
				btnRightOnPress={() => handleEdit()}
			/>
		</>
	);
}
