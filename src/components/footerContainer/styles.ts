import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: `${theme.colors.white}`,
		width: '100%',
		height: 60,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopColor: `${theme.colors.softGray}`,
		borderTopWidth: 1,
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	text: {
		fontFamily: `${theme.fonts.medium500}`,
		color: `${theme.colors.black}`,
		fontSize: 14,
		textAlign: 'center',
	},
});
