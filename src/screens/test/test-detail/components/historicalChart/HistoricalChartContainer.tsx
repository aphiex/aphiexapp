import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { useAuth, useProfile } from '../../../../../context';
import { testService } from '../../../../../services';
import theme from '../../../../../styles/theme';
import {
	formatAgeInDays,
	ReferenceValue,
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
	incompleteProfile: boolean;
	referenceValues?: ReferenceValue[];
	handleGoToEditProfile: () => void;
};

export interface TTestWithReferenceValue extends Test {
	referenceValue?: ReferenceValue;
}

export const HistoricalChartContainer = ({
	testType,
	incompleteProfile,
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

	const handleSetChartSize = () => {
		const chartSize = tests.length * elementSpace;
		if (chartSize > screenSize) return chartSize;
		return screenSize;
	};

	const handleSetMeasurementSegments = (index: number) => {
		const maxReferenceValue =
			tests.length > 0 && referenceValues.length > 0
				? Math.max(...tests.map(test => test?.referenceValue.maxValue))
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
		setLoading(true);
		testService
			.handleGetHistoricalTests(testType?.id, auth.key, currentProfile?.id)
			.then(result => {
				if (referenceValues?.length > 0) {
					const newTests: TTestWithReferenceValue[] = [];

					result?.forEach(testFromDB => {
						const ageInDays = formatAgeInDays(
							new Date(currentProfile?.birthdate),
							new Date(testFromDB?.date)
						);

						let reference = undefined;
						reference = referenceValues.find(ref => {
							const allAges = Boolean(!ref?.minAge && !ref?.maxAge);

							const ageBetween = Boolean(
								ref?.minAge <= ageInDays && ref?.maxAge >= ageInDays
							);

							const ageOver = Boolean(!ref?.minAge && ref?.maxAge >= ageInDays);

							const ageUnder = Boolean(
								ref?.minAge <= ageInDays && !ref?.maxAge
							);

							const gender = Boolean(
								ref?.gender === currentProfile?.gender || ref?.gender === 'A'
							);

							const condition = Boolean(
								ref?.condition === testFromDB?.condition
							);

							if (
								gender &&
								condition &&
								(allAges || ageBetween || ageOver || ageUnder)
							)
								return ref;
						});

						newTests.push({ ...testFromDB, referenceValue: reference });
					});

					setTests(newTests);
				} else {
					setTests(result);
				}
				setMaxValue(Math.max(...result.map(test => test.value)));
				setLoading(false);
			})
			.catch(error => {
				setTests([]);
				setLoading(false);
			});
	};

	useEffect(() => {
		if (testType?.id) getTests();
	}, [testType]);

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
			incompleteProfile={incompleteProfile}
			referenceValues={referenceValues}
			handleGoToEditProfile={handleGoToEditProfile}
			handleSetMeasurementSegments={handleSetMeasurementSegments}
		/>
	);
};
