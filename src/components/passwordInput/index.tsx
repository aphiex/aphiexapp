import React, { useState } from 'react';
import {
	TextInput,
	Text,
	TextInputProps,
	View,
	TouchableOpacity,
} from 'react-native';
import { EyeOffOutline, EyeOutline } from '../../assets/icons';
import theme from '../../styles/theme';
import { styles } from './styles';

interface IPasswordInput extends TextInputProps {
	error?: string;
	label?: string;
}

export function PasswordInput({ error, label, ...rest }: IPasswordInput) {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [hidePassword, setHidePassword] = useState<boolean>(true);

	function handleSetColor() {
		if (error) return theme.colors.red;
		if (isFocused) return theme.colors.primary;
		return theme.colors.grey;
	}

	return (
		<>
			<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>

			<View
				style={[styles.passwordContainer, { borderColor: handleSetColor() }]}
			>
				<TextInput
					{...rest}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					secureTextEntry={hidePassword}
					placeholderTextColor={theme.colors.grey}
					style={styles.input}
				/>

				<TouchableOpacity
					style={styles.button}
					onPress={e => {
						e.preventDefault();
						setHidePassword(!hidePassword);
					}}
				>
					{hidePassword && (
						<EyeOffOutline
							color={isFocused ? theme.colors.primary : theme.colors.grey}
							size={20}
						/>
					)}
					{!hidePassword && (
						<EyeOutline
							color={isFocused ? theme.colors.primary : theme.colors.grey}
							size={20}
						/>
					)}
				</TouchableOpacity>
			</View>

			<Text style={styles.error}>{error}</Text>
		</>
	);
}
