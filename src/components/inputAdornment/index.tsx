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
	noError?: boolean;
	noLabel?: boolean;
	adornment?: string;
}

export function InputAdornment({
	error,
	label,
	noError,
	noLabel,
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
			{!noLabel && (
				<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>
			)}

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

			{!noError && <Text style={styles.error}>{error}</Text>}
		</>
	);
}
