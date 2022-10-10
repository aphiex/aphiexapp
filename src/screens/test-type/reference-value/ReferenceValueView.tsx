import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrashCan } from '../../../assets/icons';
import {
	CustomInputDropDown,
	CustomMaskInput,
	CustomSelectInput,
} from '../../../components';
import theme from '../../../styles/theme';
import {
	CONDITIONS_SELECT_LIST,
	GENDER_SELECT_LIST,
	ReferenceValueCreate,
	VARIATION_SELECT_LIST,
} from '../../../utils';
import { styles } from './styles';

type TReferenceValueView = {
	currentReferenceValue: ReferenceValueCreate;
	index: number;
	handleDelete: () => void;
	openCondition: boolean;
	setOpenCondition: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeCondition: (value: string) => void;
	openGender: boolean;
	setOpenGender: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeGender: (value: string) => void;
	openValueVariation: boolean;
	setOpenValueVariation: React.Dispatch<React.SetStateAction<boolean>>;
	valueVariation: string;
	setValueVariation: React.Dispatch<React.SetStateAction<string>>;
	handleChangeValueVariation: (value: string) => void;
	handleChangeMinValue: (value?: number) => void;
	handleChangeMaxValue: (value?: number) => void;
};

export function ReferenceValueView({
	currentReferenceValue,
	index,
	handleDelete,
	handleChangeCondition,
	openCondition,
	setOpenCondition,
	handleChangeGender,
	openGender,
	setOpenGender,
	handleChangeMaxValue,
	handleChangeMinValue,
	openValueVariation,
	setOpenValueVariation,
	handleChangeValueVariation,
	valueVariation,
	setValueVariation,
}: TReferenceValueView) {
	return (
		<View style={styles.container}>
			<Text style={[styles.index, styles.padding]}>{`# ${index + 1}`}</Text>
			<TouchableOpacity style={styles.trash} onPress={() => handleDelete()}>
				<TrashCan color={theme.colors.softRed} size={30} />
			</TouchableOpacity>

			<View style={styles.padding}>
				<CustomInputDropDown
					label="Condição (opcional)"
					value={currentReferenceValue?.condition}
					open={openCondition}
					setOpen={setOpenCondition}
					setValue={handleChangeCondition}
					items={CONDITIONS_SELECT_LIST}
					onChangeText={(value: string) => handleChangeCondition(value)}
					placeholder="Ex.: Gestante (30 dias)"
					onSelect={handleChangeCondition}
				/>

				<CustomSelectInput
					label="Sexo"
					open={openGender}
					setOpen={setOpenGender}
					items={GENDER_SELECT_LIST}
					value={currentReferenceValue?.gender}
					setValue={() => {}}
					onSelect={handleChangeGender}
				/>
			</View>

			{Boolean(!currentReferenceValue?.condition) && (
				<>
					<Text style={[styles.label, styles.padding]}>Intervalo de Idade</Text>
					<View style={styles.paddingBorder}>
						<CustomSelectInput
							label="Idade/Categoria"
							open={false}
							setOpen={() => {}}
							items={[]}
							value={undefined}
							setValue={() => {}}
						/>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<View style={{ width: '29%' }}>
								<CustomSelectInput
									noLabel
									open={false}
									setOpen={() => {}}
									items={[]}
									value={undefined}
									setValue={() => {}}
								/>
							</View>
							<View style={{ width: '22%' }}>
								<CustomSelectInput
									noLabel
									open={false}
									setOpen={() => {}}
									items={[]}
									value={undefined}
									setValue={() => {}}
								/>
							</View>
							<View style={{ width: '19%' }}>
								<CustomSelectInput
									noLabel
									open={false}
									setOpen={() => {}}
									items={[]}
									value={undefined}
									setValue={() => {}}
								/>
							</View>
							<View style={{ width: '22%' }}>
								<CustomSelectInput
									noLabel
									open={false}
									setOpen={() => {}}
									items={[]}
									value={undefined}
									setValue={() => {}}
								/>
							</View>
						</View>
					</View>
				</>
			)}

			<Text style={[styles.label, styles.padding]}>Intervalo de Valores</Text>
			<View
				style={[
					styles.paddingBorder,
					{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					},
				]}
			>
				<View
					style={{
						width:
							currentReferenceValue?.maxValue === undefined ||
							currentReferenceValue?.minValue === undefined
								? '48%'
								: '38%',
					}}
				>
					{Boolean(currentReferenceValue?.minValue !== undefined) && (
						<CustomMaskInput
							label={
								currentReferenceValue?.maxValue === undefined
									? 'Valor'
									: 'Valor inicial'
							}
							keyboardType="number-pad"
							mask="9999999999"
							value={currentReferenceValue?.minValue?.toString()}
							onChangeText={(_, rawText) => {
								if (currentReferenceValue?.minValue !== undefined)
									handleChangeMinValue(Number(rawText));
							}}
						/>
					)}
					{Boolean(currentReferenceValue?.minValue === undefined) && (
						<CustomMaskInput
							label="Valor"
							keyboardType="number-pad"
							mask="9999999999"
							value={currentReferenceValue?.maxValue?.toString()}
							onChangeText={(_, rawText) => {
								if (currentReferenceValue?.maxValue !== undefined)
									handleChangeMaxValue(Number(rawText));
							}}
						/>
					)}
				</View>
				<View
					style={{
						width:
							currentReferenceValue?.maxValue === undefined ||
							currentReferenceValue?.minValue === undefined
								? '48%'
								: '20%',
					}}
				>
					<CustomSelectInput
						open={openValueVariation}
						setOpen={setOpenValueVariation}
						items={VARIATION_SELECT_LIST}
						value={valueVariation}
						setValue={setValueVariation}
						onSelect={handleChangeValueVariation}
						dropDownContainerStyle={{ minWidth: 120 }}
					/>
				</View>
				{!Boolean(
					currentReferenceValue?.maxValue === undefined ||
						currentReferenceValue?.minValue === undefined
				) && (
					<View style={{ width: '38%' }}>
						<CustomMaskInput
							label="Valor final"
							keyboardType="number-pad"
							mask="9999999999"
							value={currentReferenceValue?.maxValue?.toString()}
							onChangeText={(_, rawText) => {
								if (currentReferenceValue?.maxValue !== undefined)
									handleChangeMaxValue(Number(rawText));
							}}
						/>
					</View>
				)}
			</View>
		</View>
	);
}

/* 															ADICIONAR DADOS NOS INPUTS
( OK ) condição especial: custom input dropdown / caso exista, não é possivel setar idade/categoria

idade/categoria: custom select input / se for "Outro" mostrar os campos abaixo:
	-> dias/meses/anos: custom select input
	-> inicial: custom  input (numeros inteiros)
	-> variação: custom select input / caso seja diferente de "a" o campo final é escondido
	-> final: custom  input (numeros inteiros)

( OK ) sexo: custom select input

( OK ) valor inicial: custom  input (numeros decimais) / caso a variação seja diferente de "a", mudar label para "Valor"

( OK ) variação: custom select input / caso seja diferente de "a" o campo valor final é escondido

( OK ) valor inicial: custom  input (numeros decimais)
*/
