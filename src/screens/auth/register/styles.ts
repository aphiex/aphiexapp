import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: proportionalResize(30),
	},
	text: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: proportionalResize(15),
		textAlign: 'left',
	},
	textMb: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: proportionalResize(15),
		textAlign: 'left',
		marginBottom: proportionalResize(15),
	},
	textContainer: {
		marginTop: proportionalResize(26),
		marginBottom: proportionalResize(40),
		paddingHorizontal: proportionalResize(12),
	},
	error: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.red}`,
		fontSize: proportionalResize(12),
		textAlign: 'left',
		marginLeft: proportionalResize(10),
		marginTop: proportionalResize(4),
	},
	password: {
		marginBottom: proportionalResize(5),
		width: '100%',
	},
	passwordConfirm: {
		marginBottom: proportionalResize(30),
		width: '100%',
	},
});
