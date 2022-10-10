import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
	},
	form: {
		marginTop: 40,
		width: '100%',
		paddingHorizontal: 18,
	},
	button: {
		borderRadius: 50,
		width: 56,
		height: 56,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.primary,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 20,
	},
	subTitle: {
		marginVertical: 10,
		fontFamily: theme.fonts.medium500,
		fontSize: 24,
		color: theme.colors.grey,
	},
	text: {
		fontFamily: theme.fonts.regular400,
		fontSize: 16,
		color: theme.colors.grey,
		marginBottom: 10,
	},
});
