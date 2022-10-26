import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { HeartPulse } from '../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../components';
import { RootStackParamList } from '../../routers/PrivateStack';
import theme from '../../styles/theme';
import { SettingsView } from './SettingsView';

export function SettingsContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'Settings'>) {
	const handleToCreateTestType = () => {
		navigation.navigate('TestTypeCreate');
	};

	const handleToEditTestType = () => {
		navigation.navigate('TestTypeEdit');
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<SettingsView
					handleToCreateTestType={handleToCreateTestType}
					handleToEditTestType={handleToEditTestType}
				/>
			</ScreenContainer>
			<FooterContainer
				btnMiddleTitle="Menu Principal"
				btnMiddleOnPress={() => navigation.goBack()}
				btnMiddleIcon={<HeartPulse size={24} color={theme.colors.primary} />}
				btnMiddleVariant="primary"
			/>
		</>
	);
}
