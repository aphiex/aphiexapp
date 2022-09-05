import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';
import { styles } from './styles';

export function LoadingState() {
	return (
		<View style={styles.loading}>
			<ActivityIndicator size="large" color={theme.colors.primary} />
		</View>
	);
}
