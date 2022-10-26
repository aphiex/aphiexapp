import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		marginBottom: 40,
	},
	form: {
		marginTop: 50,
		width: '100%',
	},
	title: {
		fontFamily: theme.fonts.regular400,
		fontSize: 24,
		color: theme.colors.primary,
	},
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: 19,
		color: theme.colors.black,
	},
	desciption: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.black,
	},
	contentContainer: {
		marginBottom: 40,
	},

	modalContainer: {
		position: 'relative',
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
		padding: 35,
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
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
