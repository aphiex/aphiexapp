import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Plus } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { testService } from '../../../services';
import theme from '../../../styles/theme';
import { Test } from '../../../utils/Types';
import { TestListView } from './TestListView';

export function TestListContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'TestList'>) {
	const [tests, setTests] = useState<Test[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const { auth } = useAuth();
	const { currentProfile } = useProfile();

	const selectTest = (id?: number) => {
		if (id) navigation.navigate('TestDetail', { testId: id });
	};

	const goToCreateTest = () => {
		navigation.navigate('TestCreate');
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const getTests = async () => {
		setLoading(true);
		testService
			.handleGetTests(auth.key, currentProfile?.id, 'DESC')
			.then(result => {
				setTests(result);
			})
			.catch(error => {
				setTests([]);
			});
		setLoading(false);
	};

	useEffect(() => {
		getTests();
		const willFocusSubscription = navigation.addListener('focus', () => {
			getTests();
		});

		return willFocusSubscription;
	}, []);

	return (
		<>
			<ScreenContainer hasFooter>
				<TestListView
					tests={tests}
					loading={loading}
					selectTest={selectTest}
					goToCreateTest={goToCreateTest}
				/>
			</ScreenContainer>
			{!loading && (
				<FooterContainer
					btnLeftTitle="Voltar"
					btnLeftVariant="secondary"
					btnLeftOnPress={() => handleGoBack()}
					btnLeftDisabled={loading}
					btnRightTitle="Adicionar"
					btnRightVariant="primary"
					btnRightOnPress={() => goToCreateTest()}
					btnRightIcon={<Plus size={18} color={theme.colors.white} />}
				/>
			)}
		</>
	);
}
