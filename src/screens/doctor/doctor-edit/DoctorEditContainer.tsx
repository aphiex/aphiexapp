import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Restart } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { RootStackParamList } from '../../../routers/PrivateStack';
import { cityService, doctorService } from '../../../services';
import theme from '../../../styles/theme';
import { Doctor, SelectItem, validateEmail } from '../../../utils';
import { DoctorEditView } from './DoctorEditView';

export function DoctorEditContainer({
	navigation,
	route,
}: NativeStackScreenProps<RootStackParamList, 'DoctorEdit'>) {
	const { doctorId } = route.params;
	const [doctor, setDoctor] = useState<Doctor>();

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
			name !== (doctor?.name ? doctor?.name : '') ||
				fixedPhone !== (doctor?.fixedPhone ? doctor?.fixedPhone : '') ||
				mobilePhone !== (doctor?.mobilePhone ? doctor?.mobilePhone : '') ||
				email !== (doctor?.email ? doctor?.email : '') ||
				specialty !== (doctor?.specialty ? doctor?.specialty : '') ||
				crm !== (doctor?.crm ? doctor?.crm : '') ||
				address !==
					(doctor?.address ? doctor?.address?.split(', n° ')[0] : '') ||
				addressNumber !==
					(doctor?.address ? doctor?.address?.split(', n° ')[1] : '') ||
				state !== (doctor?.city?.state ? doctor?.city?.state : null) ||
				city !== (doctor?.city?.id ? doctor?.city?.id?.toString() : null)
		);
	};

	const resetForm = () => {
		setName(doctor?.name || '');
		setNameError('');
		setFixedPhone(doctor?.fixedPhone || '');
		setFixedPhoneError('');
		setMobilePhone(doctor?.mobilePhone || '');
		setMobilePhoneError('');
		setEmail(doctor?.email || '');
		setEmailError('');
		setSpecialty(doctor?.specialty || '');
		setCrm(doctor?.crm || '');
		setAddress(doctor?.address?.split(', n° ')[0] || '');
		setAddressNumber(doctor?.address?.split(', n° ')[1] || '');
		setState(doctor?.city?.state || null);
		setCity(doctor?.city?.id?.toString() || null);
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
							navigation.goBack();
						},
					},
				]
			);
		} else navigation.goBack();
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

	const handleGetDoctor = (id: number) => {
		setLoading(true);
		try {
			if (id && auth?.key) {
				doctorService
					.handleGetDoctorById(auth?.key, id)
					.then(result => {
						setDoctor(result);
						setName(result?.name || '');
						setFixedPhone(result?.fixedPhone || '');
						setMobilePhone(result?.mobilePhone || '');
						setEmail(result?.email || '');
						setSpecialty(result?.specialty || '');
						setCrm(result?.crm || '');
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
				doctorService
					.handleUpdateDoctor(
						{
							id: doctorId,
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
							crm: crm?.trim() || '',
							email: email?.toLowerCase().trim() || '',
							fixedPhone: fixedPhone || '',
							mobilePhone: mobilePhone || '',
							specialty: specialty?.trim() || '',
						},
						auth?.key || ''
					)
					.then(() => {
						Alert.alert('Médico atualizado com sucesso!');
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

	useEffect(() => {
		if (state) handleGetCities(state);
	}, [state]);

	return (
		<>
			<ScreenContainer hasFooter>
				<DoctorEditView
					handleChangeName={handleChangeName}
					name={name}
					doctor={doctor}
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
