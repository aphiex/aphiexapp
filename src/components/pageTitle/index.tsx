import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type TPageTitle = {
	title: string;
	icon?: JSX.Element;
};

export function PageTitle({ icon, title }: TPageTitle) {
	return (
		<View style={styles.container}>
			{icon}
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}
