import theme from '../../styles/theme';
import { StatusBar, StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: `${theme.colors.white}`,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: proportionalResize(18),
		paddingTop: proportionalResize(20),
	},
});
