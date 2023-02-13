import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	centeredView: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	background: {
		flex: 1,
		backgroundColor: theme.colors.black,
		opacity: 0.2,
	},
	modalView: {
		margin: proportionalResize(20),
		backgroundColor: 'white',
		borderRadius: proportionalResize(20),
		padding: proportionalResize(32),
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
