import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 40,
	},
	form: {
		marginTop: 40,
		width: '100%',
	},
	subTitle: {
		fontFamily: theme.fonts.medium500,
		fontSize: 24,
		color: theme.colors.grey,
	},
	checkBoxLabel: {
		fontFamily: theme.fonts.regular400,
		fontSize: 16,
		marginLeft: 10,
	},
	subContainer: {
		marginVertical: 10,
		width: '100%',
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
	},
	checkbox: {
		width: 25,
		height: 25,
	},
	imageBtnContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginTop: 20,
	},
	imageBtnContainerText: {
		fontFamily: theme.fonts.medium500,
		fontSize: 18,
		color: theme.colors.grey,
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
});
