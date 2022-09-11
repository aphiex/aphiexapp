import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { cityService, placeService } from '../../../services';
import theme from '../../../styles/theme';
import { Place, SelectItem, validateEmail } from '../../../utils';
import { PlaceEditView } from './PlaceEditView';

export function PlaceEditContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'PlaceEdit'>) {
	const { placeId } = route.params;
	const [place, setPlace] = useState<Place>();

	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');

	const [fixedPhone, setFixedPhone] = useState<string>('');
	const [fixedPhoneError, setFixedPhoneError] = useState<string>('');

	const [mobilePhone, setMobilePhone] = useState<string>('');
	const [mobilePhoneError, setMobilePhoneError] = useState<string>('');

	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');

	const [address, setAddress] = useState<string>('');

	const [addressNumber, setAddressNumber] = useState<string>('');

	const [state, setState] = useState<string | null>(null);

	const [city, setCity] = useState<string | null>(null);
	const [cityError, setCityError] = useState<string>('');

	const [citiesList, setCitiesList] = useState<SelectItem[]>([]);

	const [loading, setLoading] = useState<boolean>(false);
	const [loadingCities, setLoadingCities] = useState<boolean>(false);

	const [openStateDropdown, setOpenStateDropdown] = useState<boolean>(false);
	const [openCityDropdown, setOpenCityDropdown] = useState<boolean>(false);

	const { auth } = useAuth();

	const handleChangeName = (value: string) => {
		setName(value);
		if (nameError) setNameError('');
	};

	const handleChangeFixedPhone = (value: string) => {
		setFixedPhone(value);
		if (fixedPhoneError) setFixedPhoneError('');
	};

	const handleChangeMobilePhone = (value: string) => {
		setMobilePhone(value);
		if (mobilePhoneError) setMobilePhoneError('');
	};

	const handleChangeEmail = (value: string) => {
		setEmail(value);
		if (emailError) setEmailError('');
	};

	const handleChangeAddress = (value: string) => {
		setAddress(value);
	};

	const handleChangeAddressNumber = (value: string) => {
		const onlyNumbers = value.replace(/[^0-9.]/g, '');
		setAddressNumber(onlyNumbers);
	};

	const handleValidation = () => {
		if (!name) {
			setNameError('Informe um nome');
			return false;
		}
		if (fixedPhone && fixedPhone.length < 10) {
			setFixedPhoneError('Telefone inválido');
			return false;
		}
		if (mobilePhone && mobilePhone.length < 11) {
			setMobilePhoneError('Celular inválido');
			return false;
		}

		if (email && !validateEmail(email)) {
			setEmailError('Email inválido');
			return false;
		}

		if (state && !city) {
			setCityError('Selecione uma cidade');
			return false;
		}

		return true;
	};

	const isFormDust = () => {
		return Boolean(
			name !== (place?.name ? place?.name : '') ||
				fixedPhone !== (place?.fixedPhone ? place?.fixedPhone : '') ||
				mobilePhone !== (place?.mobilePhone ? place?.mobilePhone : '') ||
				email !== (place?.email ? place?.email : '') ||
				address !== (place?.address ? place?.address?.split(', n° ')[0] : '') ||
				addressNumber !==
					(place?.address ? place?.address?.split(', n° ')[1] : '') ||
				state !== (place?.city?.state ? place?.city?.state : null) ||
				city !== (place?.city?.id ? place?.city?.id?.toString() : null)
		);
	};

	const resetForm = () => {
		setName(place?.name || '');
		setNameError('');
		setFixedPhone(place?.fixedPhone || '');
		setFixedPhoneError('');
		setMobilePhone(place?.mobilePhone || '');
		setMobilePhoneError('');
		setEmail(place?.email || '');
		setEmailError('');
		setAddress(place?.address?.split(', n° ')[0] || '');
		setAddressNumber(place?.address?.split(', n° ')[1] || '');
		setState(place?.city?.state || null);
		setCity(place?.city?.id?.toString() || null);
	};

	const handleCancel = () => {
		if (isFormDust()) {
			Alert.alert(
				'Edição em andamento',
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
							resetForm();
							navigation.navigate('PlaceDetail', { placeId });
						},
					},
				]
			);
		} else navigation.navigate('PlaceDetail', { placeId });
	};

	const handleGetCities = (state: string) => {
		setLoadingCities(true);
		try {
			cityService
				.handleGetCitiesByState(state)
				.then(result => {
					const citieListFormat: SelectItem[] = [];
					result.forEach(city => {
						citieListFormat.push({
							label: city?.name || '',
							value: city?.id ? city.id.toString() : '',
						});
					});
					setCitiesList(citieListFormat);
					setLoadingCities(false);
				})
				.catch(error => {
					Alert.alert(error?.message || error, 'Tente novamente.');
					setLoadingCities(false);
				});
		} catch (error: any) {
			Alert.alert(error?.message || error, 'Tente novamente.');
			setLoadingCities(false);
		}
	};

	const handleGetPlace = (id: number) => {
		setLoading(true);
		try {
			if (id && auth?.key) {
				placeService
					.handleGetPlaceById(auth?.key, id)
					.then(result => {
						setPlace(result);
						setName(result?.name || '');
						setFixedPhone(result?.fixedPhone || '');
						setMobilePhone(result?.mobilePhone || '');
						setEmail(result?.email || '');
						setAddress(result?.address?.split(', n° ')[0] || '');
						setAddressNumber(result?.address?.split(', n° ')[1] || '');
						setCity(result?.city?.id?.toString() || null);
						setState(result?.city?.state || null);
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

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				placeService
					.handleUpdatePlace(
						{
							id: placeId,
							name: name?.trim() || '',
							address:
								address && addressNumber
									? `${address?.trim()}, n° ${addressNumber?.trim()}`
									: address
									? address?.trim()
									: '',
							city: {
								id: city ? parseInt(city) : undefined,
							},
							email: email?.toLowerCase().trim() || '',
							fixedPhone: fixedPhone || '',
							mobilePhone: mobilePhone || '',
						},
						auth?.key || ''
					)
					.then(() => {
						Alert.alert('Local atualizado com sucesso!');
						navigation.replace('PlaceDetail', { placeId });
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

	useEffect(() => {
		if (state) handleGetCities(state);
	}, [state]);

	return (
		<>
			<ScreenContainer hasFooter>
				<PlaceEditView
					handleChangeName={handleChangeName}
					name={name}
					nameError={nameError}
					loading={loading}
					loadingCities={loadingCities}
					openStateDropdown={openStateDropdown}
					setOpenStateDropdown={setOpenStateDropdown}
					openCityDropdown={openCityDropdown}
					setOpenCityDropdown={setOpenCityDropdown}
					fixedPhone={fixedPhone}
					fixedPhoneError={fixedPhoneError}
					handleChangeFixedPhone={handleChangeFixedPhone}
					mobilePhone={mobilePhone}
					mobilePhoneError={mobilePhoneError}
					handleChangeMobilePhone={handleChangeMobilePhone}
					email={email}
					emailError={emailError}
					handleChangeEmail={handleChangeEmail}
					address={address}
					handleChangeAddress={handleChangeAddress}
					addressNumber={addressNumber}
					handleChangeAddressNumber={handleChangeAddressNumber}
					state={state}
					city={city}
					setCity={setCity}
					cityError={cityError}
					setCityError={setCityError}
					setState={setState}
					citiesList={citiesList}
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
