import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
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
	subTitle: {
		fontFamily: theme.fonts.medium500,
		fontSize: proportionalResize(24),
		color: theme.colors.grey,
	},
	checkBoxLabel: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(16),
		marginLeft: proportionalResize(10),
	},
	subContainer: {
		marginTop: 10,
		width: '100%',
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: proportionalResize(20),
	},
	checkbox: {
		width: proportionalResize(25),
		height: proportionalResize(25),
	},
	imageBtnContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginTop: proportionalResize(20),
	},
	imageBtnContainerText: {
		fontFamily: theme.fonts.medium500,
		fontSize: proportionalResize(18),
		color: theme.colors.grey,
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	contentContainerRow: {
		flexDirection: 'row',
		marginHorizontal: proportionalResize(-4),
	},
	contentContainerRowItem: {
		flex: 1,
		marginHorizontal: proportionalResize(4),
	},
	loading: {
		marginTop: 20,
	},
});
