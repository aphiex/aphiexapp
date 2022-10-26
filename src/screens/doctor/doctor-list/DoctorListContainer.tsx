import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Plus } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { doctorService } from '../../../services';
import theme from '../../../styles/theme';
import { Doctor } from '../../../utils/Types';
import { DoctorListView } from './DoctorListView';

export function DoctorListContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, 'DoctorList'>) {
	const [doctors, setDoctors] = useState<Doctor[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const { auth } = useAuth();

	const selectDoctor = (id?: number) => {
		if (id) navigation.navigate('DoctorDetail', { doctorId: id });
	};

	const goToCreateDoctor = () => {
		navigation.navigate('DoctorCreate');
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const getDoctors = async () => {
		setLoading(true);
		doctorService
			.handleGetDoctors(auth?.key || '')
			.then(result => {
				setDoctors(result);
			})
			.catch(() => {
				setDoctors([]);
			});
		setLoading(false);
	};

	useEffect(() => {
		getDoctors();
		const willFocusSubscription = navigation.addListener('focus', () => {
			getDoctors();
		});

		return willFocusSubscription;
	}, []);

	return (
		<>
			<ScreenContainer hasFooter>
				<DoctorListView
					doctors={doctors}
					loading={loading}
					selectDoctor={selectDoctor}
					goToCreateDoctor={goToCreateDoctor}
				/>
			</ScreenContainer>
			{!loading && (
				<FooterContainer
					btnLeftTitle="Voltar"
					btnLeftVariant="secondary"
					btnLeftOnPress={() => handleGoBack()}
					btnLeftDisabled={loading}
					btnRightTitle="Adicionar"
					btnRightVariant="primary"
					btnRightOnPress={() => goToCreateDoctor()}
					btnRightIcon={<Plus size={18} color={theme.colors.white} />}
				/>
			)}
		</>
	);
}
