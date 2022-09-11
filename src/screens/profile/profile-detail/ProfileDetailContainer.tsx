import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AccountEdit } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { profileService } from '../../../services';
import theme from '../../../styles/theme';
import { ProfileDetailView } from './ProfileDetailView';

export function ProfileDetailContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProfileDetail'>) {
	const { currentProfile, leaveProfile } = useProfile();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleGoBack = () => {
		navigation.replace('Menu');
	};

	const handleEdit = () => {
		navigation.navigate('ProfileEdit');
	};

	const handleDelete = () => {
		if (currentProfile?.id) {
			setLoading(true);
			try {
				profileService
					.handleDeleteProfile(currentProfile?.id)
					.then(() => {
						Alert.alert('Perfil deletado com sucesso!');
						leaveProfile();
					})
					.catch(error => {
						Alert.alert(
							error?.message || error,
							'Reinicie o aplicativo e tente novamente.'
						);
						setLoading(false);
					});
			} catch (error: any) {
				Alert.alert(
					error?.message || error,
					'Reinicie o aplicativo e tente novamente.'
				);
				setLoading(false);
			}
		}
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<ProfileDetailView
					profile={currentProfile}
					handleDelete={handleDelete}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					loading={loading}
				/>
			</ScreenContainer>
			<FooterContainer
				btnLeftTitle="Voltar"
				btnLeftVariant="secondary"
				btnLeftOnPress={() => handleGoBack()}
				btnRightTitle="Editar"
				btnRightVariant="primary"
				btnRightIcon={<AccountEdit size={18} color={theme.colors.white} />}
				btnRightOnPress={() => handleEdit()}
			/>
		</>
	);
}
