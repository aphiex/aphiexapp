import React from 'react';
import { View } from 'react-native';
import { CardAccountDetails } from '../../../assets/icons';
import {
	CustomInput,
	CustomMaskInput,
	CustomSelectInput,
	LoadingModal,
	LoadingState,
	PageTitle,
} from '../../../components';
import { Doctor, SelectItem, STATES } from '../../../utils';
import { styles } from './styles';

type TDoctorEdit = {
	doctor: Doctor;
	name: string;
	nameError: string;
	fixedPhone: string;
	fixedPhoneError: string;
	mobilePhone: string;
	mobilePhoneError: string;
	email: string;
	emailError: string;
	specialty: string;
	crm: string;
	address: string;
	addressNumber: string;
	state: string | null;
	city: string | null;
	cityError: string;
	loading: boolean;
	loadingCities: boolean;
	openStateDropdown: boolean;
	setOpenStateDropdown: React.Dispatch<React.SetStateAction<boolean>>;
	openCityDropdown: boolean;
	setOpenCityDropdown: React.Dispatch<React.SetStateAction<boolean>>;
	setState: React.Dispatch<React.SetStateAction<string | null>>;
	setCity: React.Dispatch<React.SetStateAction<string | null>>;
	setCityError: React.Dispatch<React.SetStateAction<string>>;
	citiesList: SelectItem[];
	handleChangeName: (value: string) => void;
	handleChangeFixedPhone: (value: string) => void;
	handleChangeMobilePhone: (value: string) => void;
	handleChangeEmail: (value: string) => void;
	handleChangeSpecialty: (value: string) => void;
	handleChangeCrm: (value: string) => void;
	handleChangeAddress: (value: string) => void;
	handleChangeAddressNumber: (value: string) => void;
};

export function DoctorEditView({
	doctor,
	handleChangeName,
	name,
	nameError,
	loading,
	loadingCities,
	openCityDropdown,
	openStateDropdown,
	setOpenCityDropdown,
	setOpenStateDropdown,
	address,
	addressNumber,
	city,
	crm,
	email,
	emailError,
	fixedPhone,
	fixedPhoneError,
	handleChangeAddress,
	handleChangeAddressNumber,
	setCity,
	handleChangeCrm,
	handleChangeEmail,
	handleChangeFixedPhone,
	handleChangeMobilePhone,
	handleChangeSpecialty,
	mobilePhone,
	mobilePhoneError,
	specialty,
	state,
	setState,
	citiesList,
	cityError,
	setCityError,
}: TDoctorEdit) {
	return (
		<View style={styles.container}>
			<PageTitle title="Editar Médico" icon={<CardAccountDetails />} />

			{loading && <LoadingState />}

			{loadingCities && <LoadingModal />}

			{!loading && (
				<View style={styles.form}>
					<CustomInput
						label="Nome*"
						value={name}
						error={nameError}
						onChangeText={(value: string) => handleChangeName(value)}
						placeholder="Digite o nome"
					/>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View style={{ width: '48%' }}>
							<CustomMaskInput
								label="Telefone"
								keyboardType="number-pad"
								mask="(99) 9999-9999"
								value={fixedPhone}
								error={fixedPhoneError}
								defaultValue={fixedPhone}
								onChangeText={(text, rawText) =>
									handleChangeFixedPhone(rawText)
								}
							/>
						</View>
						<View style={{ width: '48%' }}>
							<CustomMaskInput
								label="Celular"
								keyboardType="number-pad"
								mask="(99) 99999-9999"
								value={mobilePhone}
								defaultValue={mobilePhone}
								error={mobilePhoneError}
								onChangeText={(text, rawText) =>
									handleChangeMobilePhone(rawText)
								}
							/>
						</View>
					</View>

					<CustomInput
						label="Email"
						keyboardType="email-address"
						value={email}
						error={emailError}
						onChangeText={(value: string) => handleChangeEmail(value)}
					/>

					<CustomInput
						label="Especialidade"
						value={specialty}
						onChangeText={(value: string) => handleChangeSpecialty(value)}
						placeholder="Ex.: Ortopedista"
					/>

					<CustomInput
						label="CRM"
						value={crm}
						onChangeText={(value: string) => handleChangeCrm(value)}
					/>

					<CustomInput
						label="Endereço"
						value={address}
						onChangeText={(value: string) => handleChangeAddress(value)}
					/>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View style={{ width: '48%' }}>
							<CustomInput
								label="Número"
								keyboardType="number-pad"
								value={addressNumber}
								onChangeText={(value: string) =>
									handleChangeAddressNumber(value)
								}
							/>
						</View>
						<View style={{ width: '48%' }}>
							<CustomSelectInput
								open={openStateDropdown}
								value={state}
								items={STATES}
								setOpen={setOpenStateDropdown}
								setValue={setState}
								label="Estado"
								placeholder={'Selecionar estado'}
								onChangeValue={e => {
									if (
										e !== (doctor?.city?.state ? doctor?.city?.state : null) ||
										city !==
											(doctor?.city?.id ? doctor?.city?.id?.toString() : null)
									)
										setCity(null);
								}}
							/>
						</View>
					</View>

					<CustomSelectInput
						open={openCityDropdown}
						value={city}
						items={citiesList}
						setOpen={setOpenCityDropdown}
						setValue={setCity}
						error={cityError}
						setError={setCityError}
						label="Cidade"
						placeholder={
							!Boolean(state)
								? 'Primeiro selecione um estado'
								: 'Selecionar cidade'
						}
						disabled={!Boolean(state)}
					/>
				</View>
			)}
		</View>
	);
}
