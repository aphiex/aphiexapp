import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
