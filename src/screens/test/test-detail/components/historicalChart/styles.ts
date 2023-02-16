import { StyleSheet } from 'react-native';
import theme from '../../../../../styles/theme';
import { proportionalResize } from '../../../../../utils';

export const styles = StyleSheet.create({
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.grey,
		paddingHorizontal: proportionalResize(38),
		marginTop: proportionalResize(8),
	},
	link: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
		color: theme.colors.primary,
		paddingHorizontal: proportionalResize(38),
		marginTop: proportionalResize(8),
	},
	infoContainer: {
		marginTop: proportionalResize(24),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: '9%',
	},
	legendContainer: {
		display: 'flex',
		flexDirection: 'column',
		paddingHorizontal: proportionalResize(38),
	},
	legendContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	lastLegendContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: proportionalResize(10),
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
	greyCircle: {
		width: proportionalResize(10),
		height: proportionalResize(10),
		backgroundColor: theme.colors.grey,
		borderRadius: proportionalResize(100),
		marginRight: proportionalResize(4),
	},
	redLine: {
		width: proportionalResize(10),
		height: proportionalResize(1.5),
		backgroundColor: theme.colors.red,
		marginRight: proportionalResize(4),
	},
	measurement: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(14),
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
		height: proportionalResize(240),
	},
	rightBackground: {
		position: 'absolute',
		right: 0,
		top: 11,
		zIndex: 10,
		backgroundColor: theme.colors.white,
		height: proportionalResize(185),
		width: proportionalResize(60),
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
	loading: {
		marginTop: proportionalResize(20),
	},
	measurementPosition: {
		position: 'relative',
	},
	lineChart: {
		marginVertical: proportionalResize(8),
		borderRadius: proportionalResize(16),
	},
});
