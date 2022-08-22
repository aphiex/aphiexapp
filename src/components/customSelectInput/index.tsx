import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../../styles/theme';

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
};

const styles = StyleSheet.create({
	input: {
		borderRadius: 8,
		backgroundColor: theme.colors.white,
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		paddingHorizontal: 8,
		color: theme.colors.softBlack,
		borderWidth: 1,
		width: '100%',
		height: 50,
	},
	error: {
		fontFamily: theme.fonts.regular400,
		color: theme.colors.red,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginTop: 4,
	},
	label: {
		fontFamily: theme.fonts.regular400,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginBottom: 4,
	},
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		width: '100%',
	},
});

export function CustomSelectInput({
	error,
	label,
	items,
	open,
	setOpen,
	setValue,
	value,
	placeholder,
}: TCustomSelectInput) {
	function handleSetColor() {
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
			/>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
}
