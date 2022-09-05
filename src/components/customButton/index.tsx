import React, { ReactElement } from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	View,
} from 'react-native';
import theme from '../../styles/theme';
import { styles } from './styles';

interface ICustomButton extends TouchableOpacityProps {
	title: string;
	variant?: 'primary' | 'secondary';
	disabled?: boolean;
	icon?: ReactElement;
}

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
