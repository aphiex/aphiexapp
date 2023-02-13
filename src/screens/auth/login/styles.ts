import { StatusBar, StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	title: {
		fontSize: proportionalResize(23),
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		textAlign: 'center',
		marginVertical: proportionalResize(30),
	},
	titleBlue: {
		fontSize: proportionalResize(23),
		fontFamily: `${theme.fonts.exoRegular400}`,
		color: `${theme.colors.primary}`,
	},
	greyText: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.grey}`,
		fontSize: proportionalResize(23),
		marginBottom: proportionalResize(30),
		marginTop: proportionalResize(30),
	},
	error: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.red}`,
		fontSize: proportionalResize(12),
		textAlign: 'left',
		marginLeft: proportionalResize(10),
		marginTop: proportionalResize(4),
	},
	container2: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	password: {
		marginVertical: proportionalResize(30),
		width: '100%',
	},
	button: {
		marginBottom: proportionalResize(20),
	},
});
