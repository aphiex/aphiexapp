import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { FooterContainer, ScreenContainer } from '../../../components';
import { authService } from '../../../services';
import {
	hasInvalidCharactersPassword,
	hasInvalidLegthPassword,
} from '../../../utils';
import { RegisterView } from './RegisterView';

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
				Alert.alert(error.message, 'Reinicie o aplicativo e tente novamente.');
			}
		} else setErrorConfirm('As senhas informadas não são iguais');
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<RegisterView
					password={password}
					passwordConfirm={passwordConfirm}
					handleChangePassword={handleChangePassword}
					handleChangePasswordConfirm={handleChangePasswordConfirm}
					error={error}
					errorConfirm={errorConfirm}
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
