import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 40,
	},
	button: {
		marginTop: '50%',
	},
	listContainer: {
		marginTop: 18,
		width: '100%',
	},
	listItem: {
		borderBottomColor: theme.colors.softGray,
		borderBottomWidth: 2,
		paddingHorizontal: 16,
		paddingVertical: 12,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	title: {
		fontSize: 30,
		fontFamily: theme.fonts.regular400,
		color: theme.colors.black,
		textAlign: 'center',
		marginTop: 10,
	},
	icon: {
		backgroundColor: theme.colors.primary,
		height: 40,
		width: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 180,
	},
	text: {
		fontSize: 16,
		fontFamily: theme.fonts.regular400,
		color: theme.colors.black,
	},
	textIcon: {
		fontSize: 14,
		fontFamily: theme.fonts.medium500,
		color: theme.colors.white,
	},
	description: {
		fontSize: 14,
		fontFamily: theme.fonts.regular400,
		color: theme.colors.grey,
		marginTop: 2,
	},
	textContainer: {
		marginLeft: 14,
		display: 'flex',
		flexDirection: 'column',
	},
});
