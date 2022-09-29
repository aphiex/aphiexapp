import { StyleSheet } from 'react-native';
import theme from '../../../../../styles/theme';

export const styles = StyleSheet.create({
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.grey,
		paddingHorizontal: 38,
		marginTop: 8,
	},
	legendContainer: {
		marginTop: 10,
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
		width: 10,
		height: 10,
		backgroundColor: theme.colors.primary,
		borderRadius: 100,
		marginRight: 4,
	},
	redCircle: {
		width: 10,
		height: 10,
		backgroundColor: theme.colors.red,
		borderRadius: 100,
		marginRight: 4,
	},
	measurement: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.primary,
	},
	measurementContainer: {
		position: 'absolute',
		left: 0,
		top: 11,
		zIndex: 10,
		backgroundColor: theme.colors.white,
		width: 54,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	leftBackground: {
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 9,
		backgroundColor: theme.colors.white,
		width: 35,
		height: 240,
	},
	rightBackground: {
		position: 'absolute',
		right: 0,
		top: 11,
		zIndex: 10,
		backgroundColor: theme.colors.white,
		height: 185,
	},
	measurementValue: {
		fontFamily: theme.fonts.regular400,
		fontSize: 12,
		color: theme.colors.black,
	},
	legend: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.black,
	},
});
