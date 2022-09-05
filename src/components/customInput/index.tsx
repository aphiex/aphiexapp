import React, { useState } from 'react';
import { TextInput, Text, TextInputProps, View } from 'react-native';
import theme from '../../styles/theme';
import { styles } from './styles';

interface ICustomInput extends TextInputProps {
	error?: string;
	label?: string;
}

export function CustomInput({ error, label, ...rest }: ICustomInput) {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	function handleSetColor() {
		if (error) return theme.colors.red;
		if (isFocused) return theme.colors.primary;
		return theme.colors.grey;
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>

			<TextInput
				{...rest}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholderTextColor={theme.colors.grey}
				style={[styles.input, { borderColor: handleSetColor() }]}
			/>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
}
