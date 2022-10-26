import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AccountEdit } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { cityService, doctorService } from '../../../services';
import theme from '../../../styles/theme';
import { Doctor } from '../../../utils';
import { DoctorDetailView } from './DoctorDetailView';

export function DoctorDetailContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'DoctorDetail'>) {
	const { auth } = useAuth();
	const { doctorId } = route.params;
	const [doctor, setDoctor] = useState<Doctor>();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleEdit = () => {
		navigation.navigate('DoctorEdit', { doctorId });
	};

	const handleGetDoctor = (id: number) => {
		setLoading(true);
		try {
			if (id && auth?.key) {
				doctorService
					.handleGetDoctorById(auth?.key, id)
					.then(result => {
						setDoctor(result);
						setLoading(false);
					})
					.catch(error => {
						Alert.alert(
							error?.message || error,
							'Reinicie o aplicativo e tente novamente.'
						);
						setLoading(false);
					});
			} else {
				throw new Error('Não foi possível carregar as informações');
			}
		} catch (error: any) {
			Alert.alert(
				error?.message || error,
				'Reinicie o aplicativo e tente novamente.'
			);
			setLoading(false);
		}
	};

	const handleDelete = () => {
		if (doctorId) {
			setLoading(true);
			try {
				doctorService
					.handleDeleteDoctor(doctorId)
					.then(() => {
						Alert.alert('Médico deletado com sucesso!');
						navigation.goBack();
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

	useEffect(() => {
		if (doctorId) handleGetDoctor(doctorId);
	}, [doctorId]);

	return (
		<>
			<ScreenContainer hasFooter>
				<DoctorDetailView
					doctor={doctor}
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
