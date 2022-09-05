import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';

type TScreenContainer = {
	hasFooter?: boolean;
};

export const ScreenContainer: React.FC<TScreenContainer> = ({
	children,
	hasFooter,
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scroll}>
				<View style={{ marginBottom: hasFooter ? 80 : 0 }}>{children}</View>
			</ScrollView>
		</SafeAreaView>
	);
};
