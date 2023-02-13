import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	input: {
		flex: 1,
		backgroundColor: `${theme.colors.white}`,
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: proportionalResize(14),
		color: `${theme.colors.softBlack}`,
	},
	error: {
		fontFamily: theme.fonts.regular400,
		color: theme.colors.red,
		fontSize: proportionalResize(12),
		textAlign: 'left',
		marginLeft: proportionalResize(5),
		marginTop: proportionalResize(4),
	},
	label: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(12),
		textAlign: 'left',
		marginLeft: proportionalResize(5),
		marginBottom: proportionalResize(4),
	},
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		width: '100%',
	},
	inputContainer: {
		borderRadius: proportionalResize(8),
		paddingHorizontal: proportionalResize(8),
		borderWidth: proportionalResize(1),
		width: '100%',
		height: proportionalResize(50),
		flexDirection: 'row',
	},
	button: {
		backgroundColor: 'transparent',
	},
	icon: {
		marginLeft: proportionalResize(5),
		marginTop: proportionalResize(13),
	},
	datePicker: {
		width: proportionalResize(320),
		height: proportionalResize(260),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
});
