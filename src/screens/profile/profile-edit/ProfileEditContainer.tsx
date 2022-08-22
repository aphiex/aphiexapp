import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { profileService } from '../../../services';
import theme from '../../../styles/theme';
import { Profile } from '../../../utils';
import { ProfileEditView } from './ProfileEditView';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		marginTop: 40,
		width: '100%',
	},
});

export function ProfileEditContainer({
	route,
	navigation,
}: NativeStackScreenProps<any, any>) {
	// const { profileId } = route.params; // DEFINIR NAVEGAÇÃO PASSANDO COMO PARAMETRO O ID DO PERFIL
	// Set and Pass Param: https://remotestack.io/how-to-pass-and-get-params-to-route-in-react-native/
	// Testar se o getProfileById está funcionando e setar a resposta como valores iniciais
	// Criar o update do profile
	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [gender, setGender] = useState<string | null>(null);
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
	const [profile, setProfile] = useState<Profile | null>(null);
	const { auth } = useAuth();

	const handleChangeName = (value: string) => {
		setName(value);
		if (nameError) setNameError('');
	};

	const handleChangeLastName = (value: string) => {
		setLastName(value);
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
		return Boolean(name || lastName || description || gender || birthdate);
	};

	const clearForm = () => {
		setName('');
		setNameError('');
		setLastName('');
		setDescription('');
		setGender(null);
		setBirthdate(undefined);
	};

	const handleCancel = () => {
		if (isFormDust()) {
			Alert.alert(
				'Criação em andamento',
				'Todas as informações inseridas serão perdidas. Deseja voltar mesmo assim?',
				[
					{
						text: 'Cancelar',
						onPress: () => {},
						style: 'cancel',
					},
					{
						text: 'Sim',
						onPress: () => {
							clearForm();
							navigation.navigate('ProfileList');
						},
					},
				]
			);
		} else navigation.navigate('ProfileList');
	};

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				profileService
					.handleCreateProfile(
						{
							name: name && lastName ? `${name} ${lastName}` : name ? name : '',
							description: description || '',
							gender: gender || '',
							birthdate: birthdate?.toString() || '',
						},
						auth?.key || ''
					)
					.then(() => {
						navigation.replace('ProfileList');
					})
					.catch(error => console.log(error));
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
	};

	const getProfile = async () => {
		// setLoading(true);
		// profileService
		// 	.handleGetProfileById(auth?.key || '', profileId)
		// 	.then(result => {
		// 		setProfile(result);
		// 	})
		// 	.catch(() => {
		// 		setProfile(null);
		// 	});
		// setLoading(false);
	};

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<>
			<ScreenContainer hasFooter>
				<ProfileEditView
					styles={styles}
					handleChangeName={handleChangeName}
					handleChangeLastName={handleChangeLastName}
					handleChangeDescription={handleChangeDescription}
					name={name}
					lastName={lastName}
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
				btnMiddleTitle="Limpar"
				btnMiddleOnPress={() => clearForm()}
				btnMiddleIcon={
					<Restart
						size={24}
						color={loading ? theme.colors.grey : theme.colors.black}
					/>
				}
				btnMiddleVariant="secondary"
				btnMiddleDisabled={loading}
				btnRightTitle="Criar"
				btnRightVariant="primary"
				btnRightOnPress={() => handleSubmit()}
				btnRightDisabled={loading}
			/>
		</>
	);
}
