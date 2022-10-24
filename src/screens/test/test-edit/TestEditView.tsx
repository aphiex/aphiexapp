import Checkbox from 'expo-checkbox';
import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { FolderPlus } from '../../../assets/icons';
import {
	CustomDateInput,
	CustomInput,
	CustomSelectInput,
	InputAdornment,
	LoadingState,
	PageTitle,
} from '../../../components';
import theme from '../../../styles/theme';
import { ReferenceValue, SelectItem } from '../../../utils';
import { styles } from './styles';

type TTestEdit = {
	description: string;
	value: string;
	valueError: string;
	loading: boolean;
	referenceLoading: boolean;
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
	condition: string;
	referenceValues: ReferenceValue[];
	handleChangeValue: (v: string) => void;
	handleChangeDescription: (value: string) => void;
	handleChangeMeasurementUnit: (testTypeId: string) => void;
	handleChangeCondition: (v: string) => void;
};

export function TestEditView({
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
	condition,
	handleChangeCondition,
	referenceLoading,
	referenceValues,
}: TTestEdit) {
	return (
		<View style={styles.container}>
			<PageTitle title="Editar Exame" icon={<FolderPlus />} />

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

					{referenceLoading && (
						<ActivityIndicator
							size="large"
							color={theme.colors.primary}
							style={{ marginTop: 20 }}
						/>
					)}
					{!referenceLoading &&
						referenceValues?.length > 0 &&
						referenceValues.some(reference => reference?.condition) && (
							<View style={styles.subContainer}>
								<Text style={styles.subTitle}>Informações adicionais</Text>
								{referenceValues.map(referenceValue => {
									if (referenceValue?.condition)
										return (
											<View key={referenceValue.id} style={styles.section}>
												<Checkbox
													style={styles.checkbox}
													value={referenceValue.condition === condition}
													onValueChange={() =>
														handleChangeCondition(referenceValue.condition)
													}
													color={
														referenceValue.condition === condition
															? theme.colors.primary
															: theme.colors.grey
													}
												/>
												<Text
													numberOfLines={1}
													onPress={() =>
														handleChangeCondition(referenceValue.condition)
													}
													style={[
														styles.checkBoxLabel,
														{
															color:
																referenceValue.condition === condition
																	? theme.colors.black
																	: theme.colors.grey,
														},
													]}
												>
													{referenceValue.condition}
												</Text>
											</View>
										);
								})}
							</View>
						)}
				</View>
			)}
		</View>
	);
}
