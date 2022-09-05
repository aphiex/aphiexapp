import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { authService } from '../../../services';
import {
	hasInvalidCharactersPassword,
	hasInvalidLegthPassword,
} from '../../../utils';
import { LoginView } from './LoginView';

export function LoginContainer({
	navigation,
}: NativeStackScreenProps<any, any>) {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [fistLoad, setFirstLoad] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const [hasPassword, setHasPassword] = useState<boolean | undefined>(
		undefined
	);
	const { signIn } = useAuth();

	const checkStoragePassword = async () => {
		setLoading(true);
		authService
			.hasPassword()
			.then(result => {
				setHasPassword(result);
			})
			.catch(() => {
				setHasPassword(false);
			});
	};

	const goToRegister = () => {
		navigation.navigate('Register');
	};

	const handleSignIn = async (password: string) => {
		if (!password) setError('Informe uma senha');
		else if (
			hasInvalidLegthPassword(password) ||
			hasInvalidCharactersPassword(password)
		)
			setError('Senha inválida');
		else await signIn(password, setError);
	};

	const handleOnChange = (value: string) => {
		setPassword(value);
		if (error) setError('');
	};

	useEffect(() => {
		checkStoragePassword();
	}, []);

	useEffect(() => {
		if (fistLoad) setFirstLoad(false);
		else setLoading(false);
	}, [hasPassword]);

	return (
		<ScreenContainer>
			<LoginView
				password={password}
				handleOnChange={handleOnChange}
				handleSignIn={handleSignIn}
				error={error}
				loading={loading}
				goToRegister={goToRegister}
				hasPassword={hasPassword}
			/>
		</ScreenContainer>
	);
}
