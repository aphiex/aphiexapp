import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { useAuth, useProfile } from '../../../../../context';
import { testService } from '../../../../../services';
import theme from '../../../../../styles/theme';
import {
	formatAgeInDays,
	ReferenceValue,
	shortDateMask,
	Test,
	TestType,
} from '../../../../../utils';
import { HistoricalChartView } from './HistoricalChartView';

export type TChartDot = {
	x: number;
	y: number;
	visible: boolean;
	value: number;
	index: number;
};

export type TDataPoint = {
	index: number;
	value: number;
	dataset: Dataset;
	x: number;
	y: number;
	getColor: (opacity: number) => string;
};

export type THistoricalChartContainer = {
	testType?: TestType;
	referenceValues?: ReferenceValue[];
	handleGoToEditProfile: () => void;
};

export interface TTestWithReferenceValue extends Test {
	referenceValue?: ReferenceValue;
}

export const HistoricalChartContainer = ({
	testType,
	referenceValues,
	handleGoToEditProfile,
}: THistoricalChartContainer) => {
	const { auth } = useAuth();
	const { currentProfile } = useProfile();
	const [tests, setTests] = useState<TTestWithReferenceValue[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [maxValue, setMaxValue] = useState<number>(0);
	const screenSize = Dimensions.get('window').width;
	const elementSpace = 80;
	const segments = 5;
	const segmentsIndexs = [0, 1, 2, 3, 4, 5];

	const [tooltipPos, setTooltipPos] = useState<TChartDot>({
		x: 0,
		y: 0,
		visible: false,
		value: 0,
		index: 0,
	});

	const isIncompleteProfile = () => {
		if (currentProfile?.birthdate && currentProfile?.gender && testType?.id)
			return false;

		return true;
	};

	const handleSetChartSize = () => {
		const chartSize = (tests.length + 1) * elementSpace;
		if (chartSize > screenSize) return chartSize;
		return screenSize;
	};

	const handleTestValues = () => {
		if (tests?.length > 0) {
			const testValues = tests?.map(test => {
				return test?.value || 0;
			});
			return testValues;
		}
		return [];
	};

	const handleMinReferenceValues = () => {
		if (tests?.length > 0 && referenceValues?.length > 0) {
			const minValues = tests?.map(test => {
				return test?.referenceValue?.minValue || 0;
			});
			minValues.push(tests[tests.length - 1]?.referenceValue?.minValue || 0);
			return minValues;
		}
		return [];
	};

	const handleMaxReferenceValues = () => {
		if (tests?.length > 0 && referenceValues?.length > 0) {
			const maxValues = tests?.map(test => {
				return test?.referenceValue?.maxValue || 0;
			});
			maxValues.push(tests[tests.length - 1]?.referenceValue?.maxValue || 0);
			return maxValues;
		}
		return [];
	};

	const handleLabels = () => {
		if (tests?.length > 0) {
			const formatedLabels = tests?.map(test => {
				return shortDateMask(new Date(test?.date));
			});

			formatedLabels.push('');
			return formatedLabels;
		}
		return [];
	};

	const handleSetMeasurementSegments = (index: number) => {
		const maxReferenceValue =
			tests.length > 0 && referenceValues.length > 0
				? Math.max(
						...tests.map(test => {
							return test?.referenceValue?.maxValue || 0;
						})
				  )
				: 0;

		if (maxReferenceValue && maxReferenceValue >= maxValue) {
			return Math.round(
				maxReferenceValue - (maxReferenceValue / segments) * index
			);
		}
		return Math.round(maxValue - (maxValue / segments) * index);
	};

	const setTooltipPositionX = () => {
		if (tooltipPos.index === 0) return tooltipPos.x;
		if (tooltipPos.index === tests.length - 1)
			return tooltipPos.x - tooltipPos.value.toFixed(2).length * 10;
		return tooltipPos.x - tooltipPos.value.toFixed(2).length * 5;
	};

	const setTooltipTextPositionX = () => {
		if (tooltipPos.index === 0) return tooltipPos.x + 25;
		if (tooltipPos.index === tests.length - 1)
			return tooltipPos.x - tooltipPos.value.toFixed(2).length * 5;
		return tooltipPos.x;
	};

	const setTooltipPositionY = () => {
		if (tooltipPos.value > maxValue - maxValue / segments)
			return tooltipPos.y + 10;
		return tooltipPos.y - 40;
	};

	const setTooltipTextPositionY = () => {
		if (tooltipPos.value > maxValue - maxValue / segments)
			return tooltipPos.y + 30;
		return tooltipPos.y - 20;
	};

	const handleDotColor = (dataPoint: number, index: number) => {
		const referenceValue = tests[index]?.referenceValue || undefined;

		if (!referenceValue) return theme.colors.grey;
		if (
			(referenceValue?.maxValue && dataPoint > referenceValue.maxValue) ||
			(referenceValue?.minValue && dataPoint < referenceValue?.minValue)
		) {
			return theme.colors.red;
		}
		return theme.colors.primary;
	};

	const handleDataPointClick = (data: TDataPoint) => {
		const isSamePoint = Boolean(
			tooltipPos.x === data.x && tooltipPos.y === data.y
		);

		isSamePoint
			? setTooltipPos(previousState => {
					return {
						...previousState,
						value: data.value,
						visible: !previousState.visible,
					};
			  })
			: setTooltipPos({
					x: data.x,
					value: data.value,
					y: data.y,
					visible: true,
					index: data.index,
			  });
	};

	const getTests = async () => {
		if (isIncompleteProfile()) {
			setLoading(false);
		} else {
			setLoading(true);
			testService
				.handleGetHistoricalTests(testType?.id, auth?.key, currentProfile?.id)
				.then(result => {
					if (referenceValues?.length > 0) {
						const newTests: TTestWithReferenceValue[] = [];

						result?.forEach(testFromDB => {
							const ageInDays = formatAgeInDays(
								new Date(currentProfile?.birthdate),
								new Date(testFromDB?.date)
							);

							let reference = undefined;

							reference = referenceValues?.find(ref => {
								// ABRIR O BANCO E FAZER TESTE DE MESA COM AS CONDIÇÕES ABAIXO
								const gender = Boolean(
									// TRUE
									ref?.gender === currentProfile?.gender || ref?.gender === 'A'
								);

								const condition = Boolean(
									// FALSE
									ref?.condition === testFromDB?.condition &&
										ref?.condition &&
										testFromDB?.condition
								);

								if (gender && condition) return ref; // FALSE

								// the checks below are only valid if there is no condition
								if (!ref?.condition) {
									const allAges = Boolean(!ref?.minAge && !ref?.maxAge);

									const ageBetween = Boolean(
										ref?.minAge <= ageInDays && ref?.maxAge >= ageInDays
									);

									const ageOver = Boolean(
										ref?.minAge <= ageInDays && !ref?.maxAge
									);

									const ageUnder = Boolean(
										!ref?.minAge && ref?.maxAge >= ageInDays
									);

									if (gender && (allAges || ageBetween || ageOver || ageUnder))
										return ref;
								}
							});

							newTests.push({ ...testFromDB, referenceValue: reference });
						});
						setTests(newTests);
					} else {
						setTests(result);
					}
					if (result?.length > 0)
						setMaxValue(
							Math.max(
								...result?.map(test => {
									return test?.value || 0;
								})
							)
						);
					setLoading(false);
				})
				.catch(error => {
					setTests([]);
					setLoading(false);
				});
		}
	};

	useEffect(() => {
		if (testType?.id) getTests();
	}, [testType?.id]);

	return (
		<HistoricalChartView
			tests={tests}
			testType={testType}
			loading={loading}
			segments={segments}
			segmentsIndexs={segmentsIndexs}
			handleSetChartSize={handleSetChartSize}
			tooltipPos={tooltipPos}
			handleDataPointClick={handleDataPointClick}
			handleDotColor={handleDotColor}
			setTooltipPositionX={setTooltipPositionX}
			setTooltipPositionY={setTooltipPositionY}
			setTooltipTextPositionX={setTooltipTextPositionX}
			setTooltipTextPositionY={setTooltipTextPositionY}
			incompleteProfile={isIncompleteProfile()}
			referenceValues={referenceValues}
			handleGoToEditProfile={handleGoToEditProfile}
			handleSetMeasurementSegments={handleSetMeasurementSegments}
			handleTestValues={handleTestValues}
			handleMinReferenceValues={handleMinReferenceValues}
			handleMaxReferenceValues={handleMaxReferenceValues}
			handleLabels={handleLabels}
		/>
	);
};
