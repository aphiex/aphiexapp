import React, { useState } from 'react';
import { useAuth } from '../../context';
import {
	hasInvalidCharactersPassword,
	hasInvalidLegthPassword,
} from '../../utils';
import { PasswordRequestModalView } from './PasswordRequestModalView';

type TPasswordRequestModalContainer = {
	title: string;
	text: string;
	onConfirm?: any;
	onCancel?: any;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	modalVisible: boolean;
	loading: boolean;
};

export function PasswordRequestModalContainer({
	text,
	title,
	modalVisible,
	setModalVisible,
	onCancel,
	onConfirm,
	loading,
}: TPasswordRequestModalContainer) {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { auth } = useAuth();

	const handleConfirm = (password: string) => {
		if (!password) setError('Informe uma senha');
		else if (
			hasInvalidLegthPassword(password) ||
			hasInvalidCharactersPassword(password)
		)
			setError('Senha inválida');
		else if (auth?.key && password === auth.key) {
			onConfirm();
			setError('');
			setPassword('');
		} else {
			setError('Senha incorreta');
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			setError('');
			setPassword('');
			onCancel();
		} else {
			setModalVisible(false);
			setError('');
			setPassword('');
		}
	};

	const handleOnChange = (value: string) => {
		setPassword(value);
		if (error) setError('');
	};

	return (
		<PasswordRequestModalView
			error={error}
			handleCancel={handleCancel}
			handleConfirm={handleConfirm}
			modalVisible={modalVisible}
			password={password}
			handleOnChange={handleOnChange}
			text={text}
			title={title}
			loading={loading}
		/>
	);
}
