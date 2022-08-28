import React, { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { Calendar } from '../../assets/icons';
import theme from '../../styles/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateMask, formatDate, getToday } from '../../utils';

type TCustomDateInput = {
	error?: string;
	label?: string;
	value?: Date;
	setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const styles = StyleSheet.create({
	input: {
		flex: 1,
		backgroundColor: `${theme.colors.white}`,
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: 14,
		color: `${theme.colors.softBlack}`,
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
	inputContainer: {
		borderRadius: 8,
		paddingHorizontal: 8,
		borderWidth: 1,
		width: '100%',
		height: 50,
		flexDirection: 'row',
	},
	button: {
		backgroundColor: 'transparent',
	},
	icon: {
		marginLeft: 5,
		marginTop: 13,
	},
	datePicker: {
		width: 320,
		height: 260,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
});

export function CustomDateInput({
	error,
	label,
	setValue,
	value,
}: TCustomDateInput) {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isPickerShow, setIsPickerShow] = useState<boolean>(false);

	const onDateChange = (event: any, value: any) => {
		if (event.type === 'set') setValue(value);
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
					value={value || getToday()}
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
