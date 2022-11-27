import React from 'react';
import { View, Text } from 'react-native';
import { Account, TrashCan } from '../../../assets/icons';
import {
	IconButton,
	PageTitle,
	PasswordRequestModalContainer,
} from '../../../components';
import theme from '../../../styles/theme';
import { dateMask, formatGender, Profile } from '../../../utils';
import { styles } from './styles';

type TProfileDetail = {
	profile?: Profile;
	handleDelete: () => void;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	modalVisible: boolean;
	loading: boolean;
};

export function ProfileDetailView({
	profile,
	handleDelete,
	modalVisible,
	setModalVisible,
	loading,
}: TProfileDetail) {
	return (
		<>
			<PasswordRequestModalContainer
				title={profile?.name || 'Deletar Perfil'}
				text="Deseja apagar este perfil? Essa é uma ação irreversível. Para prosseguir informe sua senha."
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				onConfirm={handleDelete}
				loading={loading}
			/>
			<View style={{ position: 'absolute', right: 0, top: 0 }}>
				<IconButton
					title="Deletar"
					color={theme.colors.softRed}
					onPress={() => setModalVisible(true)}
					icon={<TrashCan size={24} color={theme.colors.softRed} />}
				/>
			</View>
			<View style={styles.container}>
				<PageTitle title="Visualizar Perfil" icon={<Account />} />

				<View style={styles.form}>
					<View style={styles.contentContainer}>
						<Text style={styles.title}>Nome</Text>
						<Text style={styles.content}>{profile?.name || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Descrição</Text>
						<Text style={styles.desciption}>{profile?.description || '-'}</Text>
					</View>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View>
							<Text style={styles.title}>Sexo</Text>
							<Text style={styles.content}>
								{profile?.gender ? formatGender(profile?.gender) : '-'}
							</Text>
						</View>

						<View>
							<Text style={styles.title}>Nascimento</Text>
							<Text style={styles.content}>
								{profile?.birthdate
									? dateMask(new Date(profile.birthdate))
									: '-'}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</>
	);
}
