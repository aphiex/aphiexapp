import theme from '../../styles/theme';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

const { height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: `${theme.colors.white}`,
	},
	scroll: {
		minHeight: height,
		paddingHorizontal: proportionalResize(18),
		paddingTop: proportionalResize(20),
	},
});
