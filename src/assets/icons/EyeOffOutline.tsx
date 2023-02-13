import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { TIconProps } from '.';
import { proportionalResize } from '../../utils';

export const EyeOffOutline: React.FC<TIconProps> = ({
	size = 64,
	color = `${theme.colors.primary}`,
}) => {
	return (
		<MaterialCommunityIcons
			name="eye-off-outline"
			size={proportionalResize(size)}
			color={color}
		/>
	);
};
