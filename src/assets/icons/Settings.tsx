import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { TIconProps } from '.';
import { proportionalResize } from '../../utils';

export const Settings: React.FC<TIconProps> = ({
	size = 64,
	color = `${theme.colors.primary}`,
}) => {
	return (
		<MaterialIcons
			name="settings"
			size={proportionalResize(size)}
			color={color}
		/>
	);
};
