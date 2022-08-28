import React, { ReactElement } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	TouchableOpacityProps,
	Text,
} from 'react-native';
import theme from '../../styles/theme';

interface IIconButton extends TouchableOpacityProps {
	title: string;
	icon: ReactElement;
	variant?: 'primary' | 'secondary';
	disabled?: boolean;
	color?: string;
}

const styles = StyleSheet.create({
	text: {
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: 14,
		textAlign: 'center',
	},
	button: {
		backgroundColor: `${theme.colors.white}`,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
});

export function IconButton({
	title,
	icon,
	variant = 'secondary',
	disabled,
	color,
	...rest
}: IIconButton) {
	return (
		<TouchableOpacity {...rest} style={styles.button} disabled={disabled}>
			{icon}
			<Text
				style={[
					styles.text,
					{
						color: disabled
							? theme.colors.grey
							: color
							? color
							: variant === 'primary'
							? theme.colors.primary
							: theme.colors.softBlack,
					},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
