import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { useAuth, useProfile } from '../../../../../context';
import { testService } from '../../../../../services';
import theme from '../../../../../styles/theme';
import { Test } from '../../../../../utils';
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

export const HistoricalChartContainer = () => {
	const { auth } = useAuth();
	const { currentProfile } = useProfile();
	const [tests, setTests] = useState<Test[]>();
	const [loading, setLoading] = useState<boolean>(false);
	const [maxValue, setMaxValue] = useState<number>(100);
	const [numberElements, setNumberElements] = useState<number>(12);
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

	const isBiggerThanScreen = () => {
		const chartSize = numberElements * elementSpace;
		return Boolean(chartSize > screenSize);
	};

	const handleSetChartSize = () => {
		const chartSize = numberElements * elementSpace;
		if (chartSize > screenSize) return chartSize;
		return screenSize;
	};

	const setTooltipPositionX = () => {
		if (tooltipPos.index === 0) return tooltipPos.x;
		if (tooltipPos.index === numberElements - 1)
			return tooltipPos.x - tooltipPos.value.toFixed(2).length * 10;
		return tooltipPos.x - tooltipPos.value.toFixed(2).length * 5;
	};

	const setTooltipTextPositionX = () => {
		if (tooltipPos.index === 0) return tooltipPos.x + 25;
		if (tooltipPos.index === numberElements - 1)
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

	const handleDotColor = (dataPoint: any) => {
		if (dataPoint > 50 || dataPoint < 25) {
			return theme.colors.red;
		}
		return theme.colors.primary;
	};

	const handleDataPointClick = (data: TDataPoint) => {
		// console.log('data: ', data);

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
			.handleGetTests(auth.key, currentProfile?.id)
			.then(result => {
				setTests(result);
			})
			.catch(error => {
				setTests([]);
			});
		setLoading(false);
	};

	useEffect(() => {
		getTests();
	}, []);

	useEffect(() => {
		console.log('x: ', tooltipPos.index);
		console.log('y: ', tooltipPos.value);
		console.log('-------------');
	}, [tooltipPos]);

	return (
		<HistoricalChartView
			tests={tests}
			loading={loading}
			maxValue={maxValue}
			segments={segments}
			segmentsIndexs={segmentsIndexs}
			handleSetChartSize={handleSetChartSize}
			isBiggerThanScreen={isBiggerThanScreen}
			tooltipPos={tooltipPos}
			handleDataPointClick={handleDataPointClick}
			handleDotColor={handleDotColor}
			setTooltipPositionX={setTooltipPositionX}
			setTooltipPositionY={setTooltipPositionY}
			setTooltipTextPositionX={setTooltipTextPositionX}
			setTooltipTextPositionY={setTooltipTextPositionY}
		/>
	);
};
