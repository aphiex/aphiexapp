import React from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../../styles/theme';
import { styles } from './styles';

type TCustomSelectInput = {
	error?: string;
	label?: string;
	open: boolean;
	value: string | null;
	items: {
		label: string;
		value: string;
	}[];
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setValue: React.Dispatch<React.SetStateAction<string | null>>;
	placeholder?: string;
	disabled?: boolean;
};

export function CustomSelectInput({
	error,
	label,
	items,
	open,
	setOpen,
	setValue,
	value,
	placeholder,
	disabled,
}: TCustomSelectInput) {
	function handleSetColor() {
		if (disabled) return theme.colors.softGray;
		if (error) return theme.colors.red;
		return theme.colors.grey;
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>

			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				placeholder={placeholder}
				placeholderStyle={{
					color: theme.colors.grey,
				}}
				dropDownDirection="AUTO"
				style={[styles.input, { borderColor: handleSetColor() }]}
				labelStyle={{
					color: theme.colors.softBlack,
				}}
				disabled={disabled}
			/>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
}
