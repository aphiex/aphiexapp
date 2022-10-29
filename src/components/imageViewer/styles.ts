import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
	image: {
		height: 150,
		width: '100%',
		borderRadius: 10,
	},
	imageItem: {
		position: 'relative',
		marginTop: 20,
		width: '48%',
		boxSizing: 'border-box',
	},
	deleteButton: {
		backgroundColor: theme.colors.white,
		padding: 8,
		borderRadius: 100,
	},
});
