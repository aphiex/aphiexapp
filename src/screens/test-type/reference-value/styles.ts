import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		borderColor: theme.colors.primary,
		borderTopWidth: 2,
		backgroundColor: theme.colors.lightGray,
		position: 'relative',
		paddingVertical: 10,
	},
	index: {
		fontFamily: theme.fonts.medium500,
		fontSize: 20,
		marginBottom: 4,
	},
	padding: {
		paddingHorizontal: 18,
	},
	paddingBorder: {
		paddingHorizontal: 9,
		marginHorizontal: 9,
		paddingTop: 10,
		borderStyle: 'dashed',
		borderColor: theme.colors.primary,
		borderWidth: 1,
		marginBottom: 10,
	},
	trash: {
		position: 'absolute',
		top: 10,
		right: 18,
		backgroundColor: theme.colors.white,
		width: 40,
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
	},
	label: {
		fontFamily: theme.fonts.regular400,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 5,
		marginBottom: 4,
		color: theme.colors.primary,
	},
});
