import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	input: {
		flex: 1,
		backgroundColor: `${theme.colors.white}`,
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: 14,
		color: `${theme.colors.softBlack}`,
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
	inputContainer: {
		borderRadius: 8,
		paddingHorizontal: 8,
		borderWidth: 1,
		width: '100%',
		height: 50,
		flexDirection: 'row',
	},
	button: {
		backgroundColor: 'transparent',
	},
	icon: {
		marginLeft: 5,
		marginTop: 13,
	},
	datePicker: {
		width: 320,
		height: 260,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
});
