import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FooterContainer, ScreenContainer } from '../../../components';
import { authService } from '../../../services';
import theme from '../../../styles/theme';
import {
	hasInvalidCharactersPassword,
	hasInvalidLegthPassword,
} from '../../../utils';
import { RegisterView } from './RegisterView';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: 30,
	},
	text: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: 15,
		textAlign: 'left',
	},
	textContainer: {
		marginTop: 26,
		marginBottom: 40,
		paddingHorizontal: 12,
	},
	error: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.red}`,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 10,
		marginTop: 4,
	},
});

export function RegisterContainer({
	navigation,
}: NativeStackScreenProps<any, any>) {
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [errorConfirm, setErrorConfirm] = useState<string>('');

	const handleChangePassword = (value: string) => {
		setPassword(value);
		if (error) setError('');
		if (errorConfirm) setErrorConfirm('');
	};

	const handleChangePasswordConfirm = (value: string) => {
		setPasswordConfirm(value);
		if (error) setError('');
		if (errorConfirm) setErrorConfirm('');
	};

	const handleSavePassword = async () => {
		if (hasInvalidCharactersPassword(password))
			setError('Digite apenas letras e números');
		else if (hasInvalidLegthPassword(password))
			setError('Sua senha deve possuir ao menos 4 caracteres');
		else if (password === passwordConfirm) {
			try {
				const passwordFromService = await authService.savePassword(password);
				if (passwordFromService) navigation.replace('Login');
			} catch (error: any) {
				setError(error.message);
			}
		} else setErrorConfirm('As senhas informadas não são iguais');
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<RegisterView
					password={password}
					passwordConfirm={passwordConfirm}
					styles={styles}
					handleChangePassword={handleChangePassword}
					handleChangePasswordConfirm={handleChangePasswordConfirm}
					error={error}
					errorConfirm={errorConfirm}
					handleSavePassword={handleSavePassword}
				/>
			</ScreenContainer>
			<FooterContainer
				btnLeftTitle="Voltar"
				btnLeftVariant="secondary"
				btnLeftOnPress={() => navigation.goBack()}
				btnRightTitle="Avançar"
				btnRightVariant="primary"
				btnRightOnPress={handleSavePassword}
			/>
		</>
	);
}
