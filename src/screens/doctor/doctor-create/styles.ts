import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: proportionalResize(40),
	},
	form: {
		marginTop: proportionalResize(40),
		width: '100%',
	},
	contentContainer: {
		flexDirection: 'row',
		marginHorizontal: proportionalResize(-4),
	},
	contentContainerItem: {
		flex: 1,
		marginHorizontal: proportionalResize(4),
	},
});
