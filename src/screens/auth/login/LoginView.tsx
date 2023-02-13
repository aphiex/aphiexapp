import React from 'react';
import { View, Text } from 'react-native';
import { Logo } from '../../../assets/icons';
import { CustomButton, LoadingState, PasswordInput } from '../../../components';
import { styles } from './styles';

type TLogin = {
	password: string;
	handleOnChange: (value: string) => void;
	handleSignIn: (password: string) => void;
	error: string;
	loading: boolean;
	goToRegister: () => void;
	hasPassword?: boolean;
};

export function LoginView({
	password,
	handleOnChange,
	handleSignIn,
	error,
	loading,
	goToRegister,
	hasPassword,
}: TLogin) {
	return (
		<View style={[styles?.container]}>
			{loading && <LoadingState />}
			{!loading && (
				<>
					<Logo />
					<Text style={styles.title}>
						Entre no {''}
						<Text style={styles.titleBlue}>Aphiex</Text>
						{''} e tenha acesso ao seu histórico de exames
					</Text>

					{hasPassword && (
						<>
							<View style={styles?.password}>
								<PasswordInput
									label="Senha*"
									placeholder="Digite sua senha"
									value={password}
									error={error}
									onChangeText={value => handleOnChange(value)}
								/>
							</View>

							<View style={styles?.button}>
								<CustomButton
									title="Entrar"
									onPress={() => handleSignIn(password)}
								/>
							</View>
						</>
					)}
					{!hasPassword && (
						<>
							<Text style={styles.greyText}>Não tem perfil registrado?</Text>
							<CustomButton title="Criar Perfil" onPress={goToRegister} />
						</>
					)}
				</>
			)}
		</View>
	);
}
