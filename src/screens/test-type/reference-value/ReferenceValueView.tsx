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
	ReferenceValueCreation,
	isAgeEmpty,
	CONDITIONS_SELECT_LIST,
	GENDER_SELECT_LIST,
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
	openCondition: boolean;
	setOpenCondition: React.Dispatch<React.SetStateAction<boolean>>;
	openGender: boolean;
	setOpenGender: React.Dispatch<React.SetStateAction<boolean>>;
	openValueVariation: boolean;
	setOpenValueVariation: React.Dispatch<React.SetStateAction<boolean>>;
	openAge: boolean;
	setOpenAge: React.Dispatch<React.SetStateAction<boolean>>;
	openTimeVariation: boolean;
	setOpenTimeVariation: React.Dispatch<React.SetStateAction<boolean>>;
	openTime: boolean;
	setOpenTime: React.Dispatch<React.SetStateAction<boolean>>;
	initalAgeLoad: boolean;
	setInitalAgeLoad: React.Dispatch<React.SetStateAction<boolean>>;
	finalAgeLoad: boolean;
	setFinalAgeLoad: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: () => void;
	handleChangeCondition: (value: string) => void;
	handleChangeGender: (value: string) => void;
	handleChangeValueVariation: (value: string) => void;
	handleChangeMinValue: (value?: string) => void;
	handleChangeMaxValue: (value?: string) => void;
	handleChangeAgeVariation: (value: string) => void;
	handleChangeTimeVariation: (value: string) => void;
	handleFormatAge: (value: number) => string;
	handleUnformatAge: (value: string) => number;
	handleChangeMinAge: (value?: number) => void;
	handleChangeMaxAge: (value?: number) => void;
	handleSetYOffset: (value?: number) => void;
	handleChangeTime: (value: string) => void;
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
				<View style={styles.containerMarginBottom}>
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

				<View style={styles.containerMarginBottom}>
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
						<View style={styles.containerMarginBottom}>
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
							<View style={[styles.contentContainer, styles.zIndexZero]}>
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
											isAgeEmpty(currentReferenceValue?.maxAge) ||
											isAgeEmpty(currentReferenceValue?.minAge)
												? '35%'
												: '26%',
									}}
								>
									{!isAgeEmpty(currentReferenceValue?.minAge) && (
										<CustomMaskInput
											noLabel
											noError
											keyboardType="number-pad"
											mask="9999999999"
											error={currentReferenceValue?.minAgeError}
											value={handleFormatAge(currentReferenceValue?.minAge)}
											onChangeText={(_, rawText) => {
												if (
													!isAgeEmpty(currentReferenceValue?.minAge) &&
													!initalAgeLoad
												)
													handleChangeMinAge(handleUnformatAge(rawText || '0'));
												if (initalAgeLoad) setInitalAgeLoad(false);
											}}
										/>
									)}

									{isAgeEmpty(currentReferenceValue?.minAge) && (
										<CustomMaskInput
											noLabel
											noError
											keyboardType="number-pad"
											mask="9999999999"
											error={currentReferenceValue?.maxAgeError}
											value={handleFormatAge(currentReferenceValue?.maxAge)}
											onChangeText={(_, rawText) => {
												if (
													!isAgeEmpty(currentReferenceValue?.maxAge) &&
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
											isAgeEmpty(currentReferenceValue?.maxAge) ||
											isAgeEmpty(currentReferenceValue?.minAge)
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
										dropDownContainerStyle={styles.dropDownContainer}
										onlyBottom
										noLabel
									/>
								</View>

								{!isAgeEmpty(currentReferenceValue?.maxAge) &&
									!isAgeEmpty(currentReferenceValue?.minAge) && (
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
														!isAgeEmpty(currentReferenceValue?.maxAge) &&
														!finalAgeLoad
													)
														handleChangeMaxAge(
															handleUnformatAge(rawText || '0')
														);
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

			<View style={styles.zIndexZero}>
				<Text style={[styles.label, styles.padding]}>Intervalo de Valores</Text>

				<View style={[styles.paddingBorder, styles.contentContainer]}>
					<View
						style={{
							width:
								!currentReferenceValue?.maxValue ||
								!currentReferenceValue?.minValue
									? '48%'
									: '38%',
						}}
					>
						{Boolean(currentReferenceValue?.minValue) && (
							<InputAdornment
								label={
									!currentReferenceValue?.maxValue ? 'Valor' : 'Valor inicial'
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

						{Boolean(!currentReferenceValue?.minValue) && (
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
								!currentReferenceValue?.maxValue ||
								!currentReferenceValue?.minValue
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
							dropDownContainerStyle={styles.dropDownContainer}
							onlyBottom
						/>
					</View>

					{!Boolean(
						!currentReferenceValue?.maxValue || !currentReferenceValue?.minValue
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
