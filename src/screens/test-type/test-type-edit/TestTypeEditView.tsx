import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FolderPlus, Plus } from '../../../assets/icons';
import {
	CustomInput,
	CustomInputDropDown,
	CustomSelectInput,
	LoadingState,
	PageTitle,
} from '../../../components';
import theme from '../../../styles/theme';
import { ReferenceValueCreation, SelectItem } from '../../../utils';
import { ReferenceValueContainer } from '../reference-value';
import { styles } from './styles';

type TTestTypeEdit = {
	name: string;
	measurementUnit: string;
	measurementUnitError: string;
	nameError: string;
	loading: boolean;
	openSelect: boolean;
	measurementUnitList: SelectItem[];
	referenceValues: ReferenceValueCreation[];
	setOpenSelect: React.Dispatch<React.SetStateAction<boolean>>;
	setMeasurementUnit: React.Dispatch<React.SetStateAction<string>>;
	setMeasurementUnitError: React.Dispatch<React.SetStateAction<string>>;
	setReferenceValues: React.Dispatch<
		React.SetStateAction<ReferenceValueCreation[]>
	>;
	handleChangeName: (value: string) => void;
	handleChangeMeasurementUnit: (value: string) => void;
	handleAddReference: () => void;
	openTestTypeDropdown: boolean;
	setOpenTestTypeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
	testType: string | null;
	setTestType: React.Dispatch<React.SetStateAction<string | null>>;
	testTypesList: SelectItem[];
	testTypeError: string;
	setTestTypeError: React.Dispatch<React.SetStateAction<string>>;
};

export function TestTypeEditView({
	handleChangeName,
	name,
	nameError,
	loading,
	handleChangeMeasurementUnit,
	measurementUnit,
	measurementUnitError,
	openSelect,
	setOpenSelect,
	setMeasurementUnit,
	setMeasurementUnitError,
	measurementUnitList,
	referenceValues,
	setReferenceValues,
	handleAddReference,
	openTestTypeDropdown,
	setOpenTestTypeDropdown,
	setTestType,
	setTestTypeError,
	testType,
	testTypeError,
	testTypesList,
}: TTestTypeEdit) {
	return (
		<>
			{loading && (
				<View style={styles.container}>
					<PageTitle title="Editar Tipo de Exame" icon={<FolderPlus />} />

					<LoadingState />
				</View>
			)}
			{!loading && (
				<>
					<View style={styles.container}>
						<PageTitle title="Editar Tipo de Exame" icon={<FolderPlus />} />

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
							/>

							{Boolean(testType) && (
								<>
									<CustomInput
										label="Nome do exame*"
										value={name}
										error={nameError}
										onChangeText={(value: string) => handleChangeName(value)}
										placeholder="Digite o nome"
									/>

									<View style={styles.contentContainer}>
										<View style={styles.contentContainerItem}>
											<CustomInputDropDown
												label="Unidade de medida*"
												value={measurementUnit}
												error={measurementUnitError}
												open={openSelect}
												setOpen={setOpenSelect}
												setValue={setMeasurementUnit}
												setError={setMeasurementUnitError}
												items={measurementUnitList}
												onChangeText={(value: string) =>
													handleChangeMeasurementUnit(value)
												}
												placeholder="Ex.: ml"
											/>
										</View>

										<View style={styles.contentContainerItem} />
									</View>

									<Text style={styles.subTitle}>Valores de referência</Text>

									{Boolean(
										!referenceValues || referenceValues?.length === 0
									) && (
										<>
											<Text style={styles.text}>
												Ao adicionar valores de referência, você poderá vê-los
												tanto no gráfico quanto em forma de tabela na
												visualização do exame.
											</Text>

											<Text style={styles.text}>
												Você pode adicionar valores de referência clicando no
												botão abaixo.
											</Text>
										</>
									)}
								</>
							)}
						</View>
					</View>

					{Boolean(testType) && (
						<View>
							{referenceValues?.map((currentReferenceValue, index) => (
								<ReferenceValueContainer
									key={index}
									index={index}
									measurementUnit={measurementUnit}
									zIndex={referenceValues?.length + 100 - index}
									currentReferenceValue={currentReferenceValue}
									referenceValues={referenceValues}
									setReferenceValues={setReferenceValues}
								/>
							))}

							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => handleAddReference()}
								>
									<Plus size={32} color={theme.colors.white} />
								</TouchableOpacity>
							</View>
						</View>
					)}
				</>
			)}
		</>
	);
}
