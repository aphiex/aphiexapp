import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		borderColor: theme.colors.primary,
		borderTopWidth: proportionalResize(2),
		backgroundColor: theme.colors.lightGray,
		position: 'relative',
		paddingVertical: proportionalResize(10),
	},
	index: {
		fontFamily: theme.fonts.medium500,
		fontSize: proportionalResize(20),
		marginBottom: proportionalResize(4),
	},
	padding: {
		paddingHorizontal: proportionalResize(18),
	},
	paddingBorder: {
		paddingHorizontal: proportionalResize(9),
		marginHorizontal: proportionalResize(9),
		paddingTop: proportionalResize(10),
		borderStyle: 'dashed',
		borderColor: theme.colors.primary,
		borderWidth: proportionalResize(1),
		marginBottom: proportionalResize(10),
	},
	trash: {
		position: 'absolute',
		top: 10,
		right: 18,
		backgroundColor: theme.colors.white,
		width: proportionalResize(40),
		height: proportionalResize(40),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: proportionalResize(50),
	},
	label: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(12),
		textAlign: 'left',
		marginLeft: proportionalResize(5),
		marginBottom: proportionalResize(4),
		color: theme.colors.primary,
	},
	containerMarginBottom: {
		marginBottom: proportionalResize(10),
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	zIndexZero: {
		zIndex: 0,
	},
	dropDownContainer: {
		minWidth: proportionalResize(120),
	},
});
