import React from 'react';
import { View, Text } from 'react-native';
import {
	Account,
	CardAccountDetails,
	FolderPlus,
	HospitalBuilding,
	Logo,
	Settings,
} from '../../assets/icons';
import { IconButton } from '../../components';
import { styles } from './styles';

type TMenu = {
	handleGoToProfile: () => void;
	handleGoToPlace: () => void;
	handleGoToExam: () => void;
	handleGoToDoctor: () => void;
	handleGoToSettings: () => void;
};

export function MenuView({
	handleGoToDoctor,
	handleGoToExam,
	handleGoToPlace,
	handleGoToProfile,
	handleGoToSettings,
}: TMenu) {
	return (
		<View style={styles.container}>
			<Logo />
			<Text style={styles.title}>Menu Principal</Text>
			<View style={styles.row}>
				<View style={styles.column}>
					<View style={styles.columnSpace}>
						<IconButton
							title="Perfil"
							icon={<Account size={70} />}
							onPress={handleGoToProfile}
						/>
					</View>
					<View style={styles.columnSpace}>
						<IconButton
							title="Locais"
							icon={<HospitalBuilding size={70} />}
							onPress={handleGoToPlace}
						/>
					</View>
					<IconButton
						title="Configurações"
						icon={<Settings size={70} />}
						onPress={handleGoToSettings}
					/>
				</View>
				<View style={styles.column}>
					<View style={styles.columnSpace}>
						<IconButton
							title="Exames"
							icon={<FolderPlus size={70} />}
							onPress={handleGoToExam}
						/>
					</View>
					<IconButton
						title="Médicos"
						icon={<CardAccountDetails size={70} />}
						onPress={handleGoToDoctor}
					/>
				</View>
			</View>
		</View>
	);
}
