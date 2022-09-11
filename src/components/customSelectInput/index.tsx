import React from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../../styles/theme';
import { styles } from './styles';

type TCustomSelectInput = {
	error?: string;
	setError?: React.Dispatch<React.SetStateAction<string>>;
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
	onChangeValue?: () => void;
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
	setError,
	onChangeValue,
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
				onChangeValue={() => {
					if (setError) setError('');
					if (onChangeValue) onChangeValue();
				}}
				dropDownDirection="AUTO"
				style={[styles.input, { borderColor: handleSetColor() }]}
				labelStyle={{
					color: theme.colors.softBlack,
				}}
				disabled={disabled}
				searchable={true}
				searchPlaceholder="Pesquisar"
				listMode={items?.length > 30 ? 'MODAL' : 'SCROLLVIEW'}
			/>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
}
