import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';

type TScreenContainer = {
	hasFooter?: boolean;
	hasPadding?: boolean;
	scrollRef?: React.MutableRefObject<undefined>;
};

export const ScreenContainer: React.FC<TScreenContainer> = ({
	children,
	hasFooter,
	hasPadding = true,
	scrollRef,
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={hasPadding && styles.scroll} ref={scrollRef}>
				<View style={{ marginBottom: hasFooter ? 80 : 0 }}>{children}</View>
			</ScrollView>
		</SafeAreaView>
	);
};
