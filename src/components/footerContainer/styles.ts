import theme from '../../styles/theme';
import { StyleSheet } from 'react-native';
import { proportionalResize } from '../../utils';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: `${theme.colors.white}`,
		width: '100%',
		height: proportionalResize(60),
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopColor: `${theme.colors.softGray}`,
		borderTopWidth: proportionalResize(1),
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		paddingHorizontal: proportionalResize(20),
	},
	text: {
		fontFamily: `${theme.fonts.medium500}`,
		color: `${theme.colors.black}`,
		fontSize: proportionalResize(14),
		textAlign: 'center',
	},
});
