import React from 'react';
import { View } from 'react-native';
import { FolderPlus, HospitalBuilding } from '../../../assets/icons';
import {
	CustomDateInput,
	CustomInput,
	CustomMaskInput,
	CustomSelectInput,
	InputAdornment,
	LoadingModal,
	LoadingState,
	PageTitle,
} from '../../../components';
import { SelectItem, STATES } from '../../../utils';
import { styles } from './styles';

type TTestCreate = {
	description: string;
	value: string;
	valueError: string;
	loading: boolean;
	openTestTypeDropdown: boolean;
	setOpenTestTypeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
	testType: string | null;
	setTestType: React.Dispatch<React.SetStateAction<string | null>>;
	testTypesList: SelectItem[];
	testTypeError: string;
	setTestTypeError: React.Dispatch<React.SetStateAction<string>>;
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	measurementUnit: string;
	handleChangeValue: (v: string) => void;
	handleChangeDescription: (value: string) => void;
	handleChangeMeasurementUnit: (testTypeId: string) => void;
};

export function TestCreateView({
	description,
	value,
	valueError,
	loading,
	openTestTypeDropdown,
	setOpenTestTypeDropdown,
	testType,
	setTestType,
	testTypesList,
	testTypeError,
	setTestTypeError,
	handleChangeValue,
	handleChangeDescription,
	date,
	setDate,
	handleChangeMeasurementUnit,
	measurementUnit,
}: TTestCreate) {
	return (
		<View style={styles.container}>
			<PageTitle title="Adicionar Exame" icon={<FolderPlus />} />

			{loading && <LoadingState />}

			{!loading && (
				<View style={styles.form}>
					<CustomSelectInput
						open={openTestTypeDropdown}
						value={testType}
						items={testTypesList}
						setOpen={setOpenTestTypeDropdown}
						setValue={setTestType}
						error={testTypeError}
						setError={setTestTypeError}
						label="Tipo de exame*"
						placeholder={'Selecione um tipo de exame'}
						onChangeValue={e => {
							handleChangeMeasurementUnit(e);
						}}
					/>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<View style={{ width: '48%' }}>
							<InputAdornment
								label="Valor*"
								value={value}
								error={valueError}
								keyboardType="decimal-pad"
								editable={Boolean(testType)}
								onChangeText={(v: string) => handleChangeValue(v)}
								placeholder={
									Boolean(testType) ? 'Digite o valor' : 'Selecione um exame'
								}
								adornment={measurementUnit || ''}
							/>
						</View>
						<View style={{ width: '48%' }}>
							<CustomDateInput value={date} setValue={setDate} label="Data" />
						</View>
					</View>
					<CustomInput
						label="Descrição"
						value={description}
						onChangeText={(value: string) => handleChangeDescription(value)}
					/>
				</View>
			)}
		</View>
	);
}
