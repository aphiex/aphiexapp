import React from 'react';
import { View, Text } from 'react-native';
import {
	Account,
	CardAccountDetails,
	FolderPlus,
	HospitalBuilding,
	Logo,
	LogoutVariant,
	Settings,
} from '../../assets/icons';
import { IconButton } from '../../components';
import theme from '../../styles/theme';
import { styles } from './styles';

type TMenu = {
	handleGoToProfile: () => void;
	handleGoToPlace: () => void;
	handleGoToExam: () => void;
	handleGoToDoctor: () => void;
	handleGoToSettings: () => void;
	handleLeaveProfile: () => void;
};

export function MenuView({
	handleGoToDoctor,
	handleGoToExam,
	handleGoToPlace,
	handleGoToProfile,
	handleGoToSettings,
	handleLeaveProfile,
}: TMenu) {
	return (
		<View style={styles.container}>
			<Logo />

			<Text style={styles.title}>Menu Principal</Text>

			<View style={styles.row}>
				<View style={styles.column}>
					<IconButton
						title="Perfil"
						icon={<Account size={70} />}
						onPress={handleGoToProfile}
					/>
					<IconButton
						title="Locais"
						icon={<HospitalBuilding size={70} />}
						onPress={handleGoToPlace}
					/>
					<IconButton
						title="Configurações"
						icon={<Settings size={70} />}
						onPress={handleGoToSettings}
					/>
				</View>

				<View style={styles.column}>
					<IconButton
						title="Exames"
						icon={<FolderPlus size={70} />}
						onPress={handleGoToExam}
					/>
					<IconButton
						title="Médicos"
						icon={<CardAccountDetails size={70} />}
						onPress={handleGoToDoctor}
					/>
					<IconButton
						title="Sair"
						icon={<LogoutVariant size={70} color={theme.colors.softRed} />}
						onPress={handleLeaveProfile}
					/>
				</View>
			</View>
		</View>
	);
}
