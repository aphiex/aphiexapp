import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	text: {
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: proportionalResize(14),
		textAlign: 'center',
	},
	button: {
		backgroundColor: `${theme.colors.white}`,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: proportionalResize(16),
	},
});
