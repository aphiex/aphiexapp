import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
