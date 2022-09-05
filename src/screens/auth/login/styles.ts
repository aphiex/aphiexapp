import { StatusBar, StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 23,
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		textAlign: 'center',
		marginVertical: 30,
	},
	titleBlue: {
		fontSize: 23,
		fontFamily: `${theme.fonts.exoRegular400}`,
		color: `${theme.colors.primary}`,
	},
	greyText: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.grey}`,
		fontSize: 23,
		marginBottom: 30,
		marginTop: 30,
	},
	error: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.red}`,
		fontSize: 12,
		textAlign: 'left',
		marginLeft: 10,
		marginTop: 4,
	},
	container2: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
});
