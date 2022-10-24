import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrashCan } from '../../../assets/icons';
import {
	CustomInputDropDown,
	CustomMaskInput,
	CustomSelectInput,
	InputAdornment,
} from '../../../components';
import theme from '../../../styles/theme';
import {
	CONDITIONS_SELECT_LIST,
	GENDER_SELECT_LIST,
	ReferenceValueCreation,
	TIME_SELECT_LIST,
	VARIATION_SELECT_LIST,
	AGE_SELECT_LIST,
} from '../../../utils';
import { styles } from './styles';

type TReferenceValueView = {
	currentReferenceValue: ReferenceValueCreation;
	index: number;
	zIndex: number;
	measurementUnit: string;
	handleDelete: () => void;
	openCondition: boolean;
	setOpenCondition: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeCondition: (value: string) => void;
	openGender: boolean;
	setOpenGender: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeGender: (value: string) => void;
	openValueVariation: boolean;
	setOpenValueVariation: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeValueVariation: (value: string) => void;
	handleChangeMinValue: (value?: string) => void;
	handleChangeMaxValue: (value?: string) => void;
	openAge: boolean;
	setOpenAge: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeAgeVariation: (value: string) => void;
	openTimeVariation: boolean;
	setOpenTimeVariation: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeTimeVariation: (value: string) => void;
	openTime: boolean;
	setOpenTime: React.Dispatch<React.SetStateAction<boolean>>;
	handleFormatAge: (value: number) => string;
	handleUnformatAge: (value: string) => number;
	handleChangeMinAge: (value?: number) => void;
	handleChangeMaxAge: (value?: number) => void;
	handleSetYOffset: (value?: number) => void;
	handleChangeTime: (value: string) => void;
	initalAgeLoad: boolean;
	setInitalAgeLoad: React.Dispatch<React.SetStateAction<boolean>>;
	finalAgeLoad: boolean;
	setFinalAgeLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ReferenceValueView({
	currentReferenceValue,
	index,
	zIndex,
	measurementUnit,
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
	openAge,
	setOpenAge,
	handleChangeAgeVariation,
	handleChangeTimeVariation,
	openTimeVariation,
	setOpenTimeVariation,
	openTime,
	setOpenTime,
	handleFormatAge,
	handleUnformatAge,
	handleChangeMaxAge,
	handleChangeMinAge,
	handleSetYOffset,
	handleChangeTime,
	initalAgeLoad,
	setInitalAgeLoad,
	finalAgeLoad,
	setFinalAgeLoad,
}: TReferenceValueView) {
	return (
		<View
			style={[styles.container, { zIndex: zIndex }]}
			onLayout={event => handleSetYOffset(event?.nativeEvent?.layout?.y)}
		>
			<Text
				style={[
					styles.index,
					styles.padding,
					{
						color:
							currentReferenceValue?.genderError ||
							currentReferenceValue?.conditionError ||
							currentReferenceValue?.maxAgeError ||
							currentReferenceValue?.minAgeError ||
							currentReferenceValue?.minValueError ||
							currentReferenceValue?.maxValueError
								? theme.colors.red
								: theme.colors.black,
					},
				]}
			>{`# ${index + 1}`}</Text>
			<TouchableOpacity style={styles.trash} onPress={() => handleDelete()}>
				<TrashCan color={theme.colors.softRed} size={30} />
			</TouchableOpacity>

			<View style={[styles.padding, { zIndex: 2 }]}>
				<View style={{ marginBottom: 10 }}>
					<CustomInputDropDown
						label="Condição (opcional)"
						value={currentReferenceValue?.condition}
						error={currentReferenceValue?.conditionError}
						open={openCondition}
						setOpen={setOpenCondition}
						setValue={handleChangeCondition}
						items={CONDITIONS_SELECT_LIST}
						onChangeText={(value: string) => handleChangeCondition(value)}
						placeholder="Ex.: Gestante (30 dias)"
						onSelect={handleChangeCondition}
						noError
					/>
				</View>
				<View style={{ marginBottom: 10 }}>
					<CustomSelectInput
						label="Sexo"
						open={openGender}
						setOpen={setOpenGender}
						error={currentReferenceValue?.genderError}
						items={GENDER_SELECT_LIST}
						value={currentReferenceValue?.gender}
						setValue={() => {}}
						onSelect={handleChangeGender}
						onlyBottom
						noError
					/>
				</View>
			</View>

			{Boolean(!currentReferenceValue?.condition) && (
				<View style={{ zIndex: 1 }}>
					{Boolean(currentReferenceValue?.ageVariation === 'CUSTOM') && (
						<Text style={[styles.label, styles.padding]}>
							Intervalo de Idade
						</Text>
					)}
					<View
						style={
							currentReferenceValue?.ageVariation === 'CUSTOM'
								? styles.paddingBorder
								: styles.padding
						}
					>
						<View style={{ marginBottom: 10 }}>
							<CustomSelectInput
								label="Idade/Categoria"
								open={openAge}
								setOpen={setOpenAge}
								items={AGE_SELECT_LIST}
								error={
									currentReferenceValue?.minAgeError ||
									currentReferenceValue?.maxAgeError
								}
								value={currentReferenceValue?.ageVariation}
								setValue={() => {}}
								onSelect={handleChangeAgeVariation}
								onlyBottom
								noError
							/>
						</View>
						{Boolean(currentReferenceValue?.ageVariation === 'CUSTOM') && (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									zIndex: 0,
								}}
							>
								<View style={{ width: '26%' }}>
									<CustomSelectInput
										noLabel
										noError
										onlyBottom
										open={openTime}
										setOpen={setOpenTime}
										items={TIME_SELECT_LIST}
										value={currentReferenceValue?.time}
										setValue={() => {}}
										onSelect={value => {
											handleChangeTime(value);
										}}
									/>
								</View>
								<View
									style={{
										width:
											currentReferenceValue?.maxAge === undefined ||
											currentReferenceValue?.minAge === undefined
												? '35%'
												: '26%',
									}}
								>
									{Boolean(currentReferenceValue?.minAge !== undefined) && (
										<CustomMaskInput
											noLabel
											noError
											keyboardType="number-pad"
											mask="9999999999"
											error={currentReferenceValue?.minAgeError}
											value={handleFormatAge(currentReferenceValue?.minAge)}
											onChangeText={(_, rawText) => {
												if (
													currentReferenceValue?.minAge !== undefined &&
													!initalAgeLoad
												)
													handleChangeMinAge(handleUnformatAge(rawText || '0'));
												if (initalAgeLoad) setInitalAgeLoad(false);
											}}
										/>
									)}
									{Boolean(currentReferenceValue?.minAge === undefined) && (
										<CustomMaskInput
											noLabel
											noError
											keyboardType="number-pad"
											mask="9999999999"
											error={currentReferenceValue?.maxAgeError}
											value={handleFormatAge(currentReferenceValue?.maxAge)}
											onChangeText={(_, rawText) => {
												if (
													currentReferenceValue?.maxAge !== undefined &&
													!finalAgeLoad
												)
													handleChangeMaxAge(handleUnformatAge(rawText || '0'));
												if (finalAgeLoad) setFinalAgeLoad(false);
											}}
										/>
									)}
								</View>

								<View
									style={{
										width:
											currentReferenceValue?.maxAge === undefined ||
											currentReferenceValue?.minAge === undefined
												? '35%'
												: '17%',
									}}
								>
									<CustomSelectInput
										open={openTimeVariation}
										setOpen={setOpenTimeVariation}
										items={VARIATION_SELECT_LIST}
										value={currentReferenceValue?.timeVariation}
										setValue={() => {}}
										onSelect={handleChangeTimeVariation}
										dropDownContainerStyle={{ minWidth: 120 }}
										onlyBottom
										noLabel
									/>
								</View>
								{!Boolean(
									currentReferenceValue?.maxAge === undefined ||
										currentReferenceValue?.minAge === undefined
								) && (
									<View style={{ width: '26%' }}>
										<CustomMaskInput
											noLabel
											noError
											keyboardType="number-pad"
											mask="9999999999"
											error={currentReferenceValue?.maxAgeError}
											value={handleFormatAge(currentReferenceValue?.maxAge)}
											onChangeText={(_, rawText) => {
												if (
													currentReferenceValue?.maxAge !== undefined &&
													!finalAgeLoad
												)
													handleChangeMaxAge(handleUnformatAge(rawText || '0'));
												if (finalAgeLoad) setFinalAgeLoad(false);
											}}
										/>
									</View>
								)}
							</View>
						)}
					</View>
				</View>
			)}

			<View style={{ zIndex: 0 }}>
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
							<InputAdornment
								label={
									currentReferenceValue?.maxValue === undefined
										? 'Valor'
										: 'Valor inicial'
								}
								value={currentReferenceValue?.minValue?.toString()}
								error={currentReferenceValue?.minValueError}
								keyboardType="decimal-pad"
								onChangeText={(v: string) => {
									if (currentReferenceValue?.minValue !== undefined)
										handleChangeMinValue(v || '0');
								}}
								adornment={measurementUnit || ''}
								noError
							/>
						)}
						{Boolean(currentReferenceValue?.minValue === undefined) && (
							<InputAdornment
								label="Valor"
								value={currentReferenceValue?.maxValue?.toString()}
								error={currentReferenceValue?.maxValueError}
								keyboardType="decimal-pad"
								onChangeText={(v: string) => {
									if (currentReferenceValue?.maxValue !== undefined)
										handleChangeMaxValue(v || '0');
								}}
								adornment={measurementUnit || ''}
								noError
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
							value={currentReferenceValue?.valueVariation}
							setValue={() => {}}
							onSelect={handleChangeValueVariation}
							dropDownContainerStyle={{ minWidth: 120 }}
							onlyBottom
						/>
					</View>
					{!Boolean(
						currentReferenceValue?.maxValue === undefined ||
							currentReferenceValue?.minValue === undefined
					) && (
						<View style={{ width: '38%' }}>
							<InputAdornment
								label="Valor final"
								value={currentReferenceValue?.maxValue?.toString()}
								error={currentReferenceValue?.maxValueError}
								keyboardType="decimal-pad"
								onChangeText={(v: string) => {
									if (currentReferenceValue?.maxValue !== undefined)
										handleChangeMaxValue(v || '0');
								}}
								adornment={measurementUnit || ''}
								noError
							/>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}
