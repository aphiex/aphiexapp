import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	input: {
		borderRadius: 8,
		backgroundColor: theme.colors.white,
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		paddingHorizontal: 8,
		color: theme.colors.softBlack,
		borderWidth: 1,
		width: '100%',
		height: 50,
	},
	error: {
		fontFamily: theme.fonts.regular400,
		color: theme.colors.red,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginTop: 4,
	},
	label: {
		fontFamily: theme.fonts.regular400,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginBottom: 4,
	},
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		width: '100%',
	},
});
