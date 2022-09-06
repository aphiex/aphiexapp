import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { HeartPulse } from '../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../components';
import { RootStackParamList } from '../../routers/PrivateStack';
import theme from '../../styles/theme';
import { MenuView } from './MenuView';

export function MenuContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'Menu'>) {
	const handleGoToProfile = () => {
		navigation.navigate('ProfileDetail');
	};

	const handleGoToPlace = () => {
		navigation.navigate('PlaceList');
	};

	const handleGoToExam = () => {
		navigation.navigate('Exam');
	};

	const handleGoToDoctor = () => {
		navigation.navigate('DoctorList');
	};

	const handleGoToSettings = () => {
		navigation.navigate('Settings');
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<MenuView
					handleGoToProfile={handleGoToProfile}
					handleGoToPlace={handleGoToPlace}
					handleGoToExam={handleGoToExam}
					handleGoToDoctor={handleGoToDoctor}
					handleGoToSettings={handleGoToSettings}
				/>
			</ScreenContainer>
			<FooterContainer
				btnMiddleTitle="Menu Principal"
				btnMiddleDisabled
				btnMiddleIcon={<HeartPulse size={24} color={theme.colors.grey} />}
				btnMiddleVariant="secondary"
			/>
		</>
	);
}
