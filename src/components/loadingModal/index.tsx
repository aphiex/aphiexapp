import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';
import { styles } from './styles';

export function LoadingModal() {
	return (
		<Modal animationType="fade" transparent={true} visible>
			<View style={styles.background} />
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View>
						<ActivityIndicator size="large" color={theme.colors.primary} />
					</View>
				</View>
			</View>
		</Modal>
	);
}
