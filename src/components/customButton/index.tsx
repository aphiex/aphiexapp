import React, { ReactElement } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	TouchableOpacityProps,
	Text,
	View,
} from 'react-native';
import theme from '../../styles/theme';

interface ICustomButton extends TouchableOpacityProps {
	title: string;
	variant?: 'primary' | 'secondary';
	disabled?: boolean;
	icon?: ReactElement;
}

const styles = StyleSheet.create({
	text: {
		fontFamily: `${theme.fonts.medium500}`,
		fontSize: 14,
	},
	button: {
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 10,
		minWidth: 120,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		marginRight: 4,
	},
});

export function CustomButton({
	title,
	variant = 'primary',
	disabled = false,
	icon,
	...rest
}: ICustomButton) {
	return (
		<TouchableOpacity
			{...rest}
			disabled={disabled}
			style={[
				styles.button,
				{
					backgroundColor:
						variant === 'primary' && !disabled
							? `${theme.colors.primary}`
							: `${theme.colors.softGray}`,
				},
			]}
		>
			{icon && <View style={styles.icon}>{icon}</View>}
			<Text
				style={[
					styles.text,
					{
						color: disabled
							? `${theme.colors.grey}`
							: variant === 'primary'
							? `${theme.colors.white}`
							: `${theme.colors.black}`,
					},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
