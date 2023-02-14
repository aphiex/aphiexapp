import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: proportionalResize(40),
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: proportionalResize(30),
		marginTop: proportionalResize(10),
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
	column: {
		flex: 1,
		justifyContent: 'space-around',
	},
});
