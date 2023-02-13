import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	image: {
		height: proportionalResize(150),
		width: '100%',
		borderRadius: proportionalResize(10),
	},
	imageItem: {
		position: 'relative',
		marginTop: proportionalResize(20),
		width: '48%',
		boxSizing: 'border-box',
	},
	deleteButton: {
		backgroundColor: theme.colors.white,
		padding: proportionalResize(8),
		borderRadius: proportionalResize(100),
	},
});
