import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: `${theme.fonts.regular400}`,
		color: `${theme.colors.black}`,
		fontSize: proportionalResize(30),
	},
});
