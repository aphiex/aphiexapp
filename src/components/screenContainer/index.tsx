import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { proportionalResize } from '../../utils';
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
			<ScrollView
				contentContainerStyle={hasPadding && styles.scroll}
				ref={scrollRef}
			>
				<View
					style={{
						marginBottom: hasFooter ? proportionalResize(80) : 0,
						flex: 1,
					}}
				>
					{children}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
