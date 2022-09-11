import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AccountEdit } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { cityService, placeService } from '../../../services';
import theme from '../../../styles/theme';
import { Place } from '../../../utils';
import { PlaceDetailView } from './PlaceDetailView';

export function PlaceDetailContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>) {
	const { auth } = useAuth();
	const { placeId } = route.params;
	const [place, setPlace] = useState<Place>();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleGoBack = () => {
		navigation.navigate('PlaceList');
	};

	const handleEdit = () => {
		navigation.navigate('PlaceEdit', { placeId: placeId });
	};

	const handleGetPlace = (id: number) => {
		setLoading(true);
		try {
			if (id && auth?.key) {
				placeService
					.handleGetPlaceById(auth?.key, id)
					.then(result => {
						setPlace(result);
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
		if (placeId) {
			setLoading(true);
			try {
				placeService
					.handleDeletePlace(placeId)
					.then(() => {
						Alert.alert('Local deletado com sucesso!');
						navigation.replace('PlaceList');
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
		if (placeId) handleGetPlace(placeId);
	}, [placeId]);

	return (
		<>
			<ScreenContainer hasFooter>
				<PlaceDetailView
					place={place}
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
