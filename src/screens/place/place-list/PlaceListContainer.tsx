import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Plus } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { placeService } from '../../../services';
import theme from '../../../styles/theme';
import { Place } from '../../../utils/Types';
import { PlaceListView } from './PlaceListView';

export function PlaceListContainer({
	navigation,
}: NativeStackScreenProps<RootStackParamList, any>) {
	const [places, setPlaces] = useState<Place[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const { auth } = useAuth();

	const selectPlace = (id?: number) => {
		if (id) navigation.navigate('PlaceDetail', { placeId: id });
	};

	const goToCreatePlace = () => {
		navigation.navigate('PlaceCreate');
	};

	const handleGoBack = () => {
		navigation.navigate('Menu');
	};

	const getPlaces = async () => {
		setLoading(true);
		placeService
			.handleGetPlaces(auth?.key || '')
			.then(result => {
				setPlaces(result);
			})
			.catch(error => {
				setPlaces([]);
			});
		setLoading(false);
	};

	useEffect(() => {
		getPlaces();
	}, []);

	return (
		<>
			<ScreenContainer hasFooter>
				<PlaceListView
					places={places}
					loading={loading}
					selectPlace={selectPlace}
					goToCreatePlace={goToCreatePlace}
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
					btnRightOnPress={() => goToCreatePlace()}
					btnRightIcon={<Plus size={18} color={theme.colors.white} />}
				/>
			)}
		</>
	);
}
