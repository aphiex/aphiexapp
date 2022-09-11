import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { TIconProps } from '.';

export const NotePlusOutline: React.FC<TIconProps> = ({
	size = 64,
	color = `${theme.colors.primary}`,
}) => {
	return (
		<MaterialCommunityIcons
			name="note-plus-outline"
			size={size}
			color={color}
		/>
	);
};
