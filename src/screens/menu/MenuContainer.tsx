import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { HeartPulse, Logo } from '../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../components';
import { useProfile } from '../../context';
import { RootStackParamList } from '../../routers/PrivateStack';
import theme from '../../styles/theme';
import { MenuView } from './MenuView';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: 30,
		marginTop: 10,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 24,
		marginTop: 40,
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	columnSpace: {
		marginBottom: '30%',
	},
});

export function MenuContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'Menu'>) {
	const { currentProfile } = useProfile();

	const handleGoToProfile = () => {
		navigation.navigate('ProfileDetail', { profileId: currentProfile?.id });
	};

	const handleGoToPlace = () => {
		navigation.navigate('Place');
	};

	const handleGoToExam = () => {
		navigation.navigate('Exam');
	};

	const handleGoToDoctor = () => {
		navigation.navigate('Doctor');
	};

	const handleGoToSettings = () => {
		navigation.navigate('Settings');
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<MenuView
					styles={styles}
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
