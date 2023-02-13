import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	input: {
		marginRight: proportionalResize(30),
		width: '100%',
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
		position: 'relative',
		borderRadius: proportionalResize(8),
		backgroundColor: `${theme.colors.white}`,
		fontFamily: `${theme.fonts.regular400}`,
		fontSize: proportionalResize(14),
		paddingHorizontal: proportionalResize(8),
		color: `${theme.colors.softBlack}`,
		borderWidth: proportionalResize(1),
		width: '100%',
		height: proportionalResize(50),
		flexDirection: 'row',
		justifyContent: 'space-between',
		zIndex: 100,
	},
});
