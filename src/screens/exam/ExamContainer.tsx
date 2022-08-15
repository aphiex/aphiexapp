import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { HeartPulse } from '../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../components';
import theme from '../../styles/theme';
import { ExamView } from './ExamView';

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
});

export function ExamContainer({
	navigation,
}: NativeStackScreenProps<any, any>) {
	return (
		<>
			<ScreenContainer hasFooter>
				<ExamView styles={styles} />
			</ScreenContainer>
			<FooterContainer
				btnMiddleTitle="Menu Principal"
				btnMiddleOnPress={() => navigation.navigate('Menu')}
				btnMiddleIcon={<HeartPulse size={24} color={theme.colors.primary} />}
				btnMiddleVariant="primary"
			/>
		</>
	);
}
