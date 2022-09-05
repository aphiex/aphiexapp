import React from 'react';
import { View } from 'react-native';
import { AccountEdit, AccountPlus } from '../../../assets/icons';
import {
	CustomDateInput,
	CustomInput,
	CustomSelectInput,
	LoadingState,
	PageTitle,
} from '../../../components';
import { styles } from './styles';

type TProfileEdit = {
	name: string;
	description: string;
	gender: string | null;
	setGender: React.Dispatch<React.SetStateAction<string | null>>;
	nameError: string;
	loading: boolean;
	openDropdown: boolean;
	setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
	birthdate?: Date;
	setBirthdate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	handleChangeName: (value: string) => void;
	handleChangeDescription: (value: string) => void;
};

export function ProfileEditView({
	description,
	handleChangeDescription,
	handleChangeName,
	name,
	nameError,
	loading,
	openDropdown,
	setOpenDropdown,
	gender,
	setGender,
	birthdate,
	setBirthdate,
}: TProfileEdit) {
	return (
		<View style={styles.container}>
			<PageTitle title="Editar Perfil" icon={<AccountEdit />} />
			{loading && <LoadingState />}
			{!loading && (
				<View style={styles.form}>
					<CustomInput
						label="Nome*"
						value={name}
						error={nameError}
						onChangeText={(value: string) => handleChangeName(value)}
						placeholder="Digite o nome"
					/>
					<CustomInput
						label="Descrição"
						value={description}
						onChangeText={(value: string) => handleChangeDescription(value)}
						placeholder="Ex.: Pai da família"
					/>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View style={{ width: '48%' }}>
							<CustomSelectInput
								open={openDropdown}
								value={gender}
								items={[
									{ label: 'Masculino', value: 'M' },
									{ label: 'Feminino', value: 'F' },
								]}
								setOpen={setOpenDropdown}
								setValue={setGender}
								placeholder="Selecionar sexo"
								label="Sexo"
							/>
						</View>
						<View style={{ width: '48%' }}>
							<CustomDateInput
								value={birthdate}
								setValue={setBirthdate}
								label="Nascimento"
							/>
						</View>
					</View>
				</View>
			)}
		</View>
	);
}
