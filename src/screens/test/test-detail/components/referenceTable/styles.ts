import { StyleSheet } from 'react-native';
import theme from '../../../../../styles/theme';
import { proportionalResize } from '../../../../../utils';

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: proportionalResize(28),
		marginTop: proportionalResize(14),
	},
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.grey,
		paddingHorizontal: proportionalResize(38),
		marginTop: proportionalResize(8),
	},
	tableContent: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.black,
	},
	tableTitle: {
		fontFamily: theme.fonts.medium500,
		fontSize: proportionalResize(14),
		color: theme.colors.primary,
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		flexGrow: 0,
		justifyContent: 'space-between',
		borderBottomWidth: proportionalResize(2),
		borderBottomColor: theme.colors.softGray,
	},
	rowTitleContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		flexGrow: 0,
		justifyContent: 'space-between',
		borderBottomWidth: proportionalResize(2),
		borderBottomColor: theme.colors.softGray,
		backgroundColor: theme.colors.lightGray,
	},
	contentContainer: {
		display: 'flex',
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: proportionalResize(14),
	},
});
