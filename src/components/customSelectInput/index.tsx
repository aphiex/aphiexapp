import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
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
	noError?: boolean;
	noLabel?: boolean;
	onlyBottom?: boolean;
	onChangeValue?: (e?: any) => void;
	onSelect?: (value: string) => void;
	dropDownContainerStyle?: StyleProp<ViewStyle>;
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
	noError,
	noLabel,
	onSelect,
	dropDownContainerStyle,
	onlyBottom,
}: TCustomSelectInput) {
	function handleSetColor() {
		if (disabled) return theme.colors.softGray;
		if (error) return theme.colors.red;
		return theme.colors.grey;
	}

	return (
		<View style={styles.container}>
			{!noLabel && (
				<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>
			)}

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
				onChangeValue={e => {
					if (setError) setError('');
					if (onChangeValue) onChangeValue(e);
				}}
				dropDownDirection={onlyBottom ? 'BOTTOM' : 'AUTO'}
				style={[styles.input, { borderColor: handleSetColor() }]}
				labelStyle={{
					color: theme.colors.softBlack,
				}}
				disabled={disabled}
				searchable={items?.length > 10}
				searchPlaceholder="Pesquisar"
				dropDownContainerStyle={[dropDownContainerStyle]}
				listMode={items?.length > 30 ? 'MODAL' : 'SCROLLVIEW'}
				onSelectItem={({ value }) => {
					if (onSelect) onSelect(value);
				}}
			/>

			{!noError && <Text style={styles.error}>{error}</Text>}
		</View>
	);
}
