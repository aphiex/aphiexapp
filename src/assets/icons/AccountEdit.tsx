import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { TIconProps } from '.';
import { proportionalResize } from '../../utils';

export const AccountEdit: React.FC<TIconProps> = ({
	size = 64,
	color = `${theme.colors.primary}`,
}) => {
	return (
		<MaterialCommunityIcons
			name="account-edit"
			size={proportionalResize(size)}
			color={color}
		/>
	);
};
