import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';

type TScreenContainer = {
	hasFooter?: boolean;
	hasPadding?: boolean;
};

export const ScreenContainer: React.FC<TScreenContainer> = ({
	children,
	hasFooter,
	hasPadding = true,
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={hasPadding && styles.scroll}>
				<View style={{ marginBottom: hasFooter ? 80 : 0 }}>{children}</View>
			</ScrollView>
		</SafeAreaView>
	);
};
