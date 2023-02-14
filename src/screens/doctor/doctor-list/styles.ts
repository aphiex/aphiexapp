import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: proportionalResize(40),
	},
	button: {
		marginTop: '50%',
	},
	listContainer: {
		marginTop: proportionalResize(18),
		width: '100%',
	},
	listItem: {
		borderBottomColor: theme.colors.softGray,
		borderBottomWidth: proportionalResize(2),
		paddingHorizontal: proportionalResize(16),
		paddingVertical: proportionalResize(12),
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	title: {
		fontSize: proportionalResize(30),
		fontFamily: theme.fonts.regular400,
		color: theme.colors.black,
		textAlign: 'center',
		marginTop: proportionalResize(10),
	},
	icon: {
		backgroundColor: theme.colors.primary,
		height: proportionalResize(40),
		width: proportionalResize(40),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: proportionalResize(180),
	},
	text: {
		fontSize: proportionalResize(16),
		fontFamily: theme.fonts.regular400,
		color: theme.colors.black,
	},
	textIcon: {
		fontSize: proportionalResize(14),
		fontFamily: theme.fonts.medium500,
		color: theme.colors.white,
	},
	description: {
		fontSize: proportionalResize(14),
		fontFamily: theme.fonts.regular400,
		color: theme.colors.grey,
		marginTop: proportionalResize(2),
	},
	textContainer: {
		marginLeft: proportionalResize(14),
	},
});
