import React from 'react';
import { View } from 'react-native';
import { HospitalBuilding } from '../../../assets/icons';
import {
	CustomInput,
	CustomMaskInput,
	CustomSelectInput,
	LoadingModal,
	LoadingState,
	PageTitle,
} from '../../../components';
import { Place, SelectItem, STATES } from '../../../utils';
import { styles } from './styles';

type TPlaceEdit = {
	place: Place;
	name: string;
	nameError: string;
	fixedPhone: string;
	fixedPhoneError: string;
	mobilePhone: string;
	mobilePhoneError: string;
	email: string;
	emailError: string;
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
	handleChangeAddress: (value: string) => void;
	handleChangeAddressNumber: (value: string) => void;
};

export function PlaceEditView({
	place,
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
	email,
	emailError,
	fixedPhone,
	fixedPhoneError,
	handleChangeAddress,
	handleChangeAddressNumber,
	setCity,
	handleChangeEmail,
	handleChangeFixedPhone,
	handleChangeMobilePhone,
	mobilePhone,
	mobilePhoneError,
	state,
	setState,
	citiesList,
	cityError,
	setCityError,
}: TPlaceEdit) {
	return (
		<View style={styles.container}>
			<PageTitle title="Editar Local" icon={<HospitalBuilding />} />

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

					<View style={styles.contentContainer}>
						<View style={styles.contentContainerItem}>
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

						<View style={styles.contentContainerItem}>
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
						label="Endereço"
						value={address}
						onChangeText={(value: string) => handleChangeAddress(value)}
					/>

					<View
						style={[
							styles.contentContainer,
							{ zIndex: openStateDropdown ? 10 : 1 },
						]}
					>
						<View style={styles.contentContainerItem}>
							<CustomInput
								label="Número"
								keyboardType="number-pad"
								value={addressNumber}
								onChangeText={(value: string) =>
									handleChangeAddressNumber(value)
								}
							/>
						</View>

						<View style={styles.contentContainerItem}>
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
										e !== (place?.city?.state ? place?.city?.state : null) ||
										city !==
											(place?.city?.id ? place?.city?.id?.toString() : null)
									)
										setCity(null);
								}}
							/>
						</View>
					</View>

					<View
						style={{
							zIndex: openCityDropdown ? 10 : 1,
						}}
					>
						<CustomSelectInput
							open={openCityDropdown}
							value={city}
							items={citiesList}
							setOpen={setOpenCityDropdown}
							setValue={setCity}
							label="Cidade"
							error={cityError}
							setError={setCityError}
							placeholder={
								!Boolean(state)
									? 'Primeiro selecione um estado'
									: 'Selecionar cidade'
							}
							disabled={!Boolean(state)}
						/>
					</View>
				</View>
			)}
		</View>
	);
}
