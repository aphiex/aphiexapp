import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: 30,
	},
	text: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: 15,
		textAlign: 'left',
	},
	textContainer: {
		marginTop: 26,
		marginBottom: 40,
		paddingHorizontal: 12,
	},
	error: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.red}`,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 10,
		marginTop: 4,
	},
});
