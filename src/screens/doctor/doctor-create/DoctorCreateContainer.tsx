import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { cityService, doctorService } from '../../../services';
import theme from '../../../styles/theme';
import { SelectItem, validateEmail } from '../../../utils';
import { DoctorCreateView } from './DoctorCreateView';

export function DoctorCreateContainer({
	navigation,
}: NativeStackScreenProps<any, any>) {
	const [name, setName] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');

	const [fixedPhone, setFixedPhone] = useState<string>('');
	const [fixedPhoneError, setFixedPhoneError] = useState<string>('');

	const [mobilePhone, setMobilePhone] = useState<string>('');
	const [mobilePhoneError, setMobilePhoneError] = useState<string>('');

	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');

	const [specialty, setSpecialty] = useState<string>('');

	const [crm, setCrm] = useState<string>('');

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

	const handleChangeSpecialty = (value: string) => {
		setSpecialty(value);
	};

	const handleChangeCrm = (value: string) => {
		setCrm(value);
	};

	const handleChangeAddress = (value: string) => {
		setAddress(value);
	};

	const handleChangeAddressNumber = (value: string) => {
		const onlyNumbers = value.replace(/[^0-9]/g, '');
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
			name ||
				fixedPhone ||
				mobilePhone ||
				email ||
				specialty ||
				crm ||
				address ||
				addressNumber ||
				state ||
				city
		);
	};

	const clearForm = () => {
		setName('');
		setNameError('');
		setFixedPhone('');
		setFixedPhoneError('');
		setMobilePhone('');
		setMobilePhoneError('');
		setEmail('');
		setEmailError('');
		setSpecialty('');
		setCrm('');
		setAddress('');
		setAddressNumber('');
		setState('');
		setCity('');
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
							navigation.navigate('DoctorList');
						},
					},
				]
			);
		} else navigation.navigate('DoctorList');
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

	const handleSubmit = () => {
		if (handleValidation()) {
			setLoading(true);
			try {
				doctorService
					.handleCreateDoctor(
						{
							name: name?.trim() || '',
							address:
								address && addressNumber
									? `${address?.trim()}, n° ${addressNumber?.trim()}`
									: address
									? address?.trim()
									: '',
							cityId: city ? parseInt(city) : undefined,
							crm: crm?.trim() || '',
							email: email?.toLowerCase().trim() || '',
							fixedPhone: fixedPhone || '',
							mobilePhone: mobilePhone || '',
							specialty: specialty?.trim() || '',
						},
						auth?.key || ''
					)
					.then(() => {
						navigation.replace('DoctorList');
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
		if (state) handleGetCities(state);
	}, [state]);

	return (
		<>
			<ScreenContainer hasFooter>
				<DoctorCreateView
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
					specialty={specialty}
					handleChangeSpecialty={handleChangeSpecialty}
					crm={crm}
					handleChangeCrm={handleChangeCrm}
					address={address}
					handleChangeAddress={handleChangeAddress}
					addressNumber={addressNumber}
					handleChangeAddressNumber={handleChangeAddressNumber}
					state={state}
					city={city}
					setCity={setCity}
					setState={setState}
					citiesList={citiesList}
					cityError={cityError}
					setCityError={setCityError}
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
				btnRightDisabled={loading || !isFormDust()}
			/>
		</>
	);
}
