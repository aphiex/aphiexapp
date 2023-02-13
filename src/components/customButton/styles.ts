import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	text: {
		fontFamily: `${theme.fonts.medium500}`,
		fontSize: proportionalResize(14),
	},
	button: {
		borderRadius: proportionalResize(8),
		paddingHorizontal: proportionalResize(16),
		paddingVertical: proportionalResize(10),
		minWidth: proportionalResize(120),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		marginRight: proportionalResize(4),
	},
});
