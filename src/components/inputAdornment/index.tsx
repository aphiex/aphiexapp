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

interface IInputAdornment extends TextInputProps {
	error?: string;
	label?: string;
	adornment?: string;
}

export function InputAdornment({
	error,
	label,
	adornment,
	...rest
}: IInputAdornment) {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	function handleSetColor() {
		if (error) return theme.colors.red;
		if (isFocused) return theme.colors.primary;
		return theme.colors.grey;
	}

	return (
		<>
			<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>

			<View style={[styles.inputContainer, { borderColor: handleSetColor() }]}>
				<TextInput
					{...rest}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholderTextColor={theme.colors.grey}
					style={styles.input}
				/>

				<Text style={styles.adornment}>{adornment}</Text>
			</View>

			<Text style={styles.error}>{error}</Text>
		</>
	);
}
