import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import theme from '../../styles/theme';
import { styles } from './styles';

interface IIconButton extends TouchableOpacityProps {
	title: string;
	icon: ReactElement;
	variant?: 'primary' | 'secondary';
	disabled?: boolean;
	color?: string;
}

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
