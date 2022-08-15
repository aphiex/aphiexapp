import React, { Props } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: `${theme.colors.white}`,
	},
	scroll: {
		paddingHorizontal: 18,
		paddingTop: 20,
	},
});

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
