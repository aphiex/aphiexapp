import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';
import { proportionalResize } from '../../../utils';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: proportionalResize(20),
	},
	form: {
		marginTop: proportionalResize(40),
		width: '100%',
		paddingHorizontal: proportionalResize(18),
	},
	button: {
		borderRadius: proportionalResize(50),
		width: proportionalResize(56),
		height: proportionalResize(56),
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
		marginVertical: proportionalResize(20),
	},
	subTitle: {
		marginVertical: proportionalResize(10),
		fontFamily: theme.fonts.medium500,
		fontSize: proportionalResize(24),
		color: theme.colors.grey,
	},
	text: {
		fontFamily: theme.fonts.regular400,
		fontSize: proportionalResize(16),
		color: theme.colors.grey,
		marginBottom: proportionalResize(10),
	},
	contentContainer: {
		flexDirection: 'row',
	},
	contentContainerItem: {
		flex: 1,
	},
});
