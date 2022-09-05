import theme from '../../styles/theme';
import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: `${theme.colors.white}`,
	},
	scroll: {
		paddingHorizontal: 18,
		paddingTop: 20,
	},
});
