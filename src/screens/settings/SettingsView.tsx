import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NoteEditOutline, NotePlusOutline, Settings } from '../../assets/icons';
import { PageTitle } from '../../components';
import { styles } from './styles';

type TSettings = {
	handleToCreateTestType: () => void;
	handleToEditTestType: () => void;
};

export function SettingsView({
	handleToCreateTestType,
	handleToEditTestType,
}: TSettings) {
	return (
		<View style={styles.container}>
			<PageTitle title="Configurações" icon={<Settings />} />

			<View style={styles.listContainer}>
				<Pressable
					style={styles.listItem}
					onPress={() => handleToCreateTestType()}
				>
					<NotePlusOutline size={36} />

					<View style={styles.textContainer}>
						<Text numberOfLines={1} style={styles.text}>
							Cadastrar novo tipo de exame
						</Text>
					</View>
				</Pressable>
			</View>

			<View style={styles.listContainer}>
				<Pressable
					style={styles.listItem}
					onPress={() => handleToEditTestType()}
				>
					<NoteEditOutline size={36} />

					<View style={styles.textContainer}>
						<Text numberOfLines={1} style={styles.text}>
							Editar tipo de exame
						</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
}
