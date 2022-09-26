import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	input: {
		flex: 1,
	},
	error: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.red}`,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginTop: 4,
	},
	label: {
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginBottom: 4,
	},
	inputContainer: {
		borderRadius: 8,
		backgroundColor: `${theme.colors.white}`,
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: 14,
		paddingHorizontal: 8,
		color: `${theme.colors.softBlack}`,
		borderWidth: 1,
		width: '100%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
	},
	adornment: {
		marginLeft: 5,
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: 14,
		color: `${theme.colors.black}`,
	},
	button: {
		backgroundColor: 'transparent',
		marginLeft: 5,
		marginTop: 13,
	},
});
