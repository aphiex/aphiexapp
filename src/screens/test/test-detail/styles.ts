import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		marginTop: proportionalResize(50),
		width: '100%',
	},
	title: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(24),
		color: theme.colors.primary,
		paddingHorizontal: proportionalResize(38),
	},
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(19),
		color: theme.colors.black,
		paddingHorizontal: proportionalResize(38),
	},
	legendContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: '4%',
	},
	legendContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	blueCircle: {
		width: proportionalResize(10),
		height: proportionalResize(10),
		backgroundColor: theme.colors.primary,
		borderRadius: proportionalResize(100),
		marginRight: proportionalResize(4),
	},
	redCircle: {
		width: proportionalResize(10),
		height: proportionalResize(10),
		backgroundColor: theme.colors.red,
		borderRadius: proportionalResize(100),
		marginRight: proportionalResize(4),
	},
	measurement: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.primary,
	},
	measurementValue: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(12),
		color: theme.colors.black,
	},
	legend: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.black,
	},
	desciption: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.black,
	},
	contentContainer: {
		marginBottom: proportionalResize(40),
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
		margin: proportionalResize(20),
		backgroundColor: 'white',
		borderRadius: proportionalResize(20),
		padding: proportionalResize(35),
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
		borderRadius: proportionalResize(20),
		padding: proportionalResize(10),
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
		marginBottom: proportionalResize(15),
		textAlign: 'center',
	},
	image: {
		width: '100%',
		borderRadius: proportionalResize(8),
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		paddingHorizontal: proportionalResize(28),
	},
	delete: {
		position: 'absolute',
		right: 0,
		top: 0,
		paddingHorizontal: proportionalResize(18),
		paddingTop: proportionalResize(20),
	},
	pageTitle: {
		paddingHorizontal: proportionalResize(18),
		paddingTop: proportionalResize(20),
	},
	contentContainerRow: {
		flexDirection: 'row',
		marginHorizontal: proportionalResize(-4),
		marginBottom: proportionalResize(40),
	},
	contentContainerRowItem: {
		flex: 1,
		marginHorizontal: proportionalResize(4),
	},
});
