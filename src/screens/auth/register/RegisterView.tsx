import React from 'react';
import { View, Text } from 'react-native';
import { Lock } from '../../../assets/icons';
import { PasswordInput } from '../../../components';
import { PageTitle } from '../../../components';
import { styles } from './styles';

type TRegister = {
	error: string;
	errorConfirm: string;
	password: string;
	passwordConfirm: string;
	handleChangePassword: (value: string) => void;
	handleChangePasswordConfirm: (value: string) => void;
};

export function RegisterView({
	error,
	errorConfirm,
	password,
	passwordConfirm,
	handleChangePasswordConfirm,
	handleChangePassword,
}: TRegister) {
	return (
		<View style={styles.container}>
			<PageTitle icon={<Lock />} title="Definir senha" />

			<View style={styles.textContainer}>
				<Text style={styles.textMb}>
					Antes de criar seu primeiro perfil é necessário definir uma senha,
					dessa forma seus dados estarão mais seguros.
				</Text>
				<Text style={styles.text}>
					Não será possível recuperar sua senha, portanto lembre-se bem dela.
				</Text>
			</View>

			<View style={styles.password}>
				<PasswordInput
					label="Senha*"
					value={password}
					error={error}
					onChangeText={(value: string) => handleChangePassword(value)}
					placeholder="Digite sua senha"
				/>
			</View>

			<View style={styles.passwordConfirm}>
				<PasswordInput
					label="Confirmar senha*"
					value={passwordConfirm}
					onChangeText={(value: string) => handleChangePasswordConfirm(value)}
					error={errorConfirm}
					placeholder="Confirme sua senha"
				/>
			</View>
		</View>
	);
}
