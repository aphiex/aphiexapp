import React, { useState } from 'react';
import { TextInput, Text, TextInputProps, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../../styles/theme';
import { styles } from './styles';

interface ICustomInput extends TextInputProps {
	error?: string;
	label?: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	setError?: React.Dispatch<React.SetStateAction<string>>;
	items: {
		label: string;
		value: string;
	}[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSelect?: (value: string) => void;
}

export function CustomInputDropDown({
	error,
	label,
	setValue,
	setError,
	items,
	open,
	setOpen,
	onSelect,
	...rest
}: ICustomInput) {
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
					style={[styles.input, { borderColor: handleSetColor() }]}
				/>
				<View
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						width: 50,
					}}
				>
					<DropDownPicker
						open={open}
						value={undefined}
						items={items}
						setOpen={setOpen}
						setValue={e => {
							setValue(e);
							if (setError) setError('');
						}}
						placeholder=""
						searchable={items?.length > 10}
						searchPlaceholder="Pesquisar"
						listMode={'MODAL'}
						style={{
							borderColor: 'transparent',
							backgroundColor: 'transparent',
							width: 50,
						}}
						onSelectItem={({ value }) => {
							if (onSelect) onSelect(value);
						}}
					/>
				</View>
			</View>

			<Text style={styles.error}>{error}</Text>
		</>
	);
}
