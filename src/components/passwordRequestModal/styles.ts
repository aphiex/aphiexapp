import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	title: {
		fontFamily: theme.fonts.medium500,
		fontSize: 18,
		color: theme.colors.black,
		marginBottom: 16,
	},
	text: {
		fontFamily: theme.fonts.regular400,
		fontSize: 16,
		color: theme.colors.softBlack,
		marginBottom: 16,
	},
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
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 32,
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
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
});
