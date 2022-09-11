import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { TIconProps } from '.';

export const NoteEditOutline: React.FC<TIconProps> = ({
	size = 64,
	color = `${theme.colors.primary}`,
}) => {
	return (
		<MaterialCommunityIcons
			name="note-edit-outline"
			size={size}
			color={color}
		/>
	);
};
