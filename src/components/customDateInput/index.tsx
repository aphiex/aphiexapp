import React, { useState } from 'react';
import {
	TextInput,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { Calendar } from '../../assets/icons';
import theme from '../../styles/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
	dateMask,
	fixDateTimezone,
	getToday,
	undoFixDateTimezone,
} from '../../utils';
import { styles } from './styles';

type TCustomDateInput = {
	error?: string;
	label?: string;
	value?: Date;
	setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export function CustomDateInput({
	error,
	label,
	setValue,
	value,
}: TCustomDateInput) {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isPickerShow, setIsPickerShow] = useState<boolean>(false);

	const onDateChange = (event: any, value: any) => {
		if (event.type === 'set') setValue(undoFixDateTimezone(value));
		if (Platform.OS === 'android') {
			setIsPickerShow(false);
		}
	};
	function handleSetColor() {
		if (error) return theme.colors.red;
		if (isFocused) return theme.colors.primary;
		return theme.colors.grey;
	}

	return (
		<View style={styles.container}>
			{isPickerShow && (
				<DateTimePicker
					value={value ? fixDateTimezone(value) : getToday()}
					mode={'date'}
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					is24Hour={true}
					onChange={onDateChange}
					onTouchCancel={() => {}}
					style={styles.datePicker}
					maximumDate={getToday()}
				/>
			)}

			<Text style={[styles.label, { color: handleSetColor() }]}>{label}</Text>

			<TouchableOpacity
				style={[
					styles.inputContainer,
					styles.button,
					{ borderColor: handleSetColor() },
				]}
				onPress={e => {
					setIsPickerShow(true);
				}}
			>
				<TextInput
					value={dateMask(value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholderTextColor={theme.colors.grey}
					style={styles.input}
					placeholder="Selecionar data"
					editable={false}
				/>

				<View style={styles.icon}>
					<Calendar
						color={isFocused ? theme.colors.primary : theme.colors.grey}
						size={20}
					/>
				</View>
			</TouchableOpacity>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
}
