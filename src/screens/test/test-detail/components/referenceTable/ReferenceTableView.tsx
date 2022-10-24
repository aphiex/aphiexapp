import React from 'react';
import { Text, View } from 'react-native';

import { ReferenceValue } from '../../../../../utils';
import { styles } from './styles';

type TReferenceTableView = {
	referenceValues?: ReferenceValue[];
	measurementUnit?: string;
	handleShowGender: (gender: string) => string;
	handleShowValueRange: (minValue?: number, maxValue?: number) => string;
	handleShowAge: (referenceValue: ReferenceValue) => string;
};

export function ReferenceTableView({
	referenceValues,
	measurementUnit,
	handleShowGender,
	handleShowValueRange,
	handleShowAge,
}: TReferenceTableView) {
	return (
		<>
			{(!referenceValues || referenceValues.length === 0) && (
				<Text style={styles.content}>
					Não foi possivel encontrar valores de referência para este exame
				</Text>
			)}
			{referenceValues && referenceValues.length > 0 && (
				<View style={styles.container}>
					<View style={styles.rowTitleContainer}>
						<View style={styles.contentContainer}>
							<Text numberOfLines={1} style={styles.tableTitle}>
								Idade/Condição
							</Text>
						</View>
						<View style={styles.contentContainer}>
							<Text numberOfLines={1} style={styles.tableTitle}>
								{measurementUnit || '-'}
							</Text>
						</View>
					</View>
					{referenceValues.map(reference => (
						<View key={reference?.id} style={styles.rowContainer}>
							<View style={styles.contentContainer}>
								{Boolean(reference?.condition) && (
									<Text numberOfLines={1} style={styles.tableContent}>
										{`reference?.condition ${handleShowGender(
											reference.gender
										)}`}
									</Text>
								)}
								{Boolean(!reference?.condition) && (
									<Text numberOfLines={1} style={styles.tableContent}>
										{`${handleShowAge(reference)} ${handleShowGender(
											reference.gender
										)}`}
									</Text>
								)}
							</View>
							<View style={styles.contentContainer}>
								<Text numberOfLines={1} style={styles.tableContent}>
									{handleShowValueRange(reference.minValue, reference.maxValue)}
								</Text>
							</View>
						</View>
					))}
				</View>
			)}
		</>
	);
}
