import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import { proportionalResize } from '../../utils';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontFamily: `${theme.fonts.exoRegular400}`,
		color: `${theme.colors.primary}`,
		fontSize: proportionalResize(34),
		textAlign: 'center',
	},
	icon: {
		marginBottom: proportionalResize(-15),
		color: `${theme.colors.primary}`,
	},
});

export const Logo: React.FC = () => {
	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				style={styles.icon}
				name="heart-pulse"
				size={proportionalResize(64)}
			/>
			<Text style={styles.text}>APHIEX</Text>
		</View>
	);
};
