import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { profileService } from '../../../services';
import theme from '../../../styles/theme';
import { fixDateTimezone } from '../../../utils';
import { ProfileEditView } from './ProfileEditView';

export function ProfileEditContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProfileEdit'>) {
	const { currentProfile, loadProfile } = useProfile();
	const [name, setName] = useState<string>(currentProfile?.name || '');
	const [nameError, setNameError] = useState<string>('');
	const [description, setDescription] = useState<string>(
		currentProfile?.description || ''
	);
	const [gender, setGender] = useState<string | null>(
		currentProfile?.gender || null
	);
	const [birthdate, setBirthdate] = useState<Date | undefined>(
		currentProfile?.birthdate
			? fixDateTimezone(new Date(currentProfile.birthdate))
			: undefined
	);
	const { auth } = useAuth();
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeName = (value: string) => {
		setName(value);
		if (nameError) setNameError('');
	};

	const handleChangeDescription = (value: string) => {
		setDescription(value);
	};

	const handleValidation = () => {
		if (!name) {
			setNameError('Informe um nome');
			return false;
		}

		return true;
	};

	const isFormDust = () => {
		return Boolean(
			(currentProfile?.name && name !== currentProfile.name) ||
				(currentProfile?.description &&
					description !== currentProfile.description) ||
				(currentProfile?.gender && gender !== currentProfile.gender) ||
				(currentProfile?.birthdate &&
					birthdate &&
					birthdate?.toString() !== currentProfile.birthdate)
		);
	};

	const resetForm = () => {
		setName(currentProfile?.name || '');
		setNameError('');
		setDescription(currentProfile?.description || '');
		setGender(currentProfile?.gender || null);
		setBirthdate(
			currentProfile?.birthdate
				? fixDateTimezone(new Date(currentProfile.birthdate))
				: undefined
		);
	};

	const handleCancel = () => {
		if (isFormDust()) {
			Alert.alert(
				'Edição em andamento',
				'Todas as informações alteradas serão perdidas. Deseja voltar mesmo assim?',
				[
					{
						text: 'Cancelar',
						onPress: () => {},
						style: 'cancel',
					},
					{
						text: 'Sim',
						onPress: () => {
							resetForm();
							navigation.navigate('ProfileDetail');
						},
					},
				]
			);
		} else navigation.navigate('ProfileDetail');
	};

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				profileService
					.handleUpdateProfile(
						{
							id: currentProfile?.id,
							name: name || currentProfile?.name || '',
							description: description || currentProfile?.description || '',
							gender: gender || currentProfile?.gender || '',
							birthdate:
								birthdate?.toString() || currentProfile?.birthdate || '',
						},
						auth?.key || ''
					)
					.then(profile => {
						loadProfile(profile);
						Alert.alert('Perfil atualizado com sucesso!');
						navigation.replace('ProfileDetail');
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
				<ProfileEditView
					handleChangeName={handleChangeName}
					handleChangeDescription={handleChangeDescription}
					name={name}
					description={description}
					gender={gender}
					setGender={setGender}
					nameError={nameError}
					loading={loading}
					openDropdown={openDropdown}
					setOpenDropdown={setOpenDropdown}
					birthdate={birthdate}
					setBirthdate={setBirthdate}
				/>
			</ScreenContainer>
			<FooterContainer
				btnLeftTitle="Cancelar"
				btnLeftVariant="secondary"
				btnLeftOnPress={() => handleCancel()}
				btnLeftDisabled={loading}
				btnMiddleTitle="Restaurar"
				btnMiddleOnPress={() => resetForm()}
				btnMiddleIcon={
					<Restart
						size={24}
						color={loading ? theme.colors.grey : theme.colors.black}
					/>
				}
				btnMiddleVariant="secondary"
				btnMiddleDisabled={loading}
				btnRightTitle="Confirmar"
				btnRightVariant="primary"
				btnRightOnPress={() => handleSubmit()}
				btnRightDisabled={loading || !isFormDust()}
			/>
		</>
	);
}
