import { StyleSheet } from 'react-native';
import theme from '../../../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 28,
		marginTop: 14,
	},
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.grey,
		paddingHorizontal: 38,
		marginTop: 8,
	},
	tableContent: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.black,
	},
	tableTitle: {
		fontFamily: theme.fonts.medium500,
		fontSize: 14,
		color: theme.colors.primary,
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		flexGrow: 0,
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		borderBottomColor: theme.colors.softGray,
	},
	rowTitleContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		flexGrow: 0,
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		borderBottomColor: theme.colors.softGray,
		backgroundColor: theme.colors.lightGray,
	},
	contentContainer: {
		display: 'flex',
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 14,
	},
});
