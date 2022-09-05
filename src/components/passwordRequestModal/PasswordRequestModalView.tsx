import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';
import { CustomButton } from '../customButton';
import { PasswordInput } from '../passwordInput';
import { styles } from './styles';

type TPasswordRequestModalView = {
	title: string;
	text: string;
	modalVisible: boolean;
	loading: boolean;
	password: string;
	error: string;
	handleConfirm: (password: string) => void;
	handleCancel: () => void;
	handleOnChange: (value: string) => void;
};

export function PasswordRequestModalView({
	error,
	handleCancel,
	handleConfirm,
	modalVisible,
	password,
	text,
	title,
	handleOnChange,
	loading,
}: TPasswordRequestModalView) {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				handleCancel();
			}}
		>
			<View style={styles.background} />
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{!loading && (
						<View>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.text}>{text}</Text>
							<PasswordInput
								label="Senha*"
								placeholder="Digite sua senha"
								value={password}
								error={error}
								onChangeText={value => handleOnChange(value)}
							/>
							<View style={styles.buttonContainer}>
								<View>
									<CustomButton
										title="Cancelar"
										onPress={handleCancel}
										variant="secondary"
									/>
								</View>
								<View>
									<CustomButton
										title="Confirmar"
										onPress={() => handleConfirm(password)}
										variant="primary"
									/>
								</View>
							</View>
						</View>
					)}
					{loading && (
						<View>
							<ActivityIndicator size="large" color={theme.colors.primary} />
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
}
