import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { AccountEdit } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useProfile } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { profileService } from '../../../services';
import theme from '../../../styles/theme';
import { ProfileDetailView } from './ProfileDetailView';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	form: {
		marginTop: 50,
		width: '100%',
	},
	title: {
		fontFamily: theme.fonts.regular400,
		fontSize: 24,
		color: theme.colors.primary,
	},
	content: {
		fontFamily: theme.fonts.regular400,
		fontSize: 19,
		color: theme.colors.black,
	},
	desciption: {
		fontFamily: theme.fonts.regular400,
		fontSize: 14,
		color: theme.colors.black,
	},
	contentContainer: {
		marginBottom: 40,
	},

	modalContainer: {
		position: 'relative',
	},
	centeredView: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	background: {
		flex: 1,
		backgroundColor: theme.colors.black,
		opacity: 0.2,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

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
						Alert.alert(error, 'Reinicie o aplicativo e tente novamente.');
						setLoading(false);
					});
			} catch (error: any) {
				Alert.alert(error.message, 'Reinicie o aplicativo e tente novamente.');
				setLoading(false);
			}
		}
	};

	return (
		<>
			<ScreenContainer hasFooter>
				<ProfileDetailView
					styles={styles}
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
