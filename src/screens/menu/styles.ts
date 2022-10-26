import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 40,
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: 30,
		marginTop: 10,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 24,
		marginTop: 40,
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	columnSpace: {
		marginBottom: '30%',
	},
});
