import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Text as TextSVG, Svg } from 'react-native-svg';
import theme from '../../../../../styles/theme';
import { Test } from '../../../../../utils';
import { styles } from './styles';
import { TChartDot, TDataPoint } from './HistoricalChartContainer';

type THistoricalChartView = {
	tests?: Test[];
	handleSetChartSize: () => number;
	isBiggerThanScreen: () => boolean;
	tooltipPos: TChartDot;
	loading: boolean;
	maxValue: number;
	segments: number;
	segmentsIndexs: number[];
	handleDataPointClick: (data: TDataPoint) => void;
	handleDotColor: (dataPoint: any) => string;
	setTooltipPositionX: () => number;
	setTooltipPositionY: () => number;
	setTooltipTextPositionX: () => number;
	setTooltipTextPositionY: () => number;
};

export function HistoricalChartView({
	tests,
	loading,
	maxValue,
	segments,
	segmentsIndexs,
	handleSetChartSize,
	isBiggerThanScreen,
	tooltipPos,
	handleDataPointClick,
	handleDotColor,
	setTooltipPositionX,
	setTooltipPositionY,
	setTooltipTextPositionX,
	setTooltipTextPositionY,
}: THistoricalChartView) {
	return (
		<>
			{loading && (
				<ActivityIndicator size="large" color={theme.colors.primary} />
			)}
			{!loading && (!tests || tests?.length === 0) && (
				<Text style={styles.content}>{'Não foi possível gerar o gráfico'}</Text>
			)}
			{!loading && tests?.length === 1 && (
				<Text style={styles.content}>
					{
						'Para gerar o gráfico é necessário que ao menos dois exames do mesmo tipo estejam cadastrados'
					}
				</Text>
			)}
			{!loading && tests?.length > 1 && (
				<View>
					<View style={styles.legendContainer}>
						<Text style={styles.legend}>{'mg/dL'}</Text>
						<View style={styles.legendContent}>
							<View style={styles.blueCircle} />
							<Text style={styles.legend}>{'Normal'}</Text>
						</View>
						<View style={styles.legendContent}>
							<View style={styles.redCircle} />
							<Text style={styles.legend}>{'Fora do padrão'}</Text>
						</View>
					</View>

					<View style={{ position: 'relative' }}>
						<View style={styles.measurementContainer}>
							{segmentsIndexs.map(index => (
								<Text
									key={index}
									style={[
										styles.measurementValue,
										{ marginTop: index === 0 ? 0 : 16.9 },
									]}
								>
									{maxValue - (maxValue / segments) * index}
								</Text>
							))}
						</View>

						<View style={styles.leftBackground} />

						<ScrollView horizontal={true}>
							<View
								style={[
									styles.rightBackground,
									{
										width: isBiggerThanScreen() ? 70 : 22,
									},
								]}
							/>
							<LineChart
								data={{
									labels: [
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
										'31/03/22',
									],
									datasets: [
										{
											data: [20, 35, 55, 12, 25, 60, 50, 85, 40, 6, 50, 100],
											color: () => theme.colors.grey,
											strokeWidth: 2,
										},
										{
											data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
											withDots: false,
											color: () => theme.colors.red,
											strokeWidth: 1,
										},
										{
											data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
											withDots: false,
											color: () => theme.colors.red,
											strokeWidth: 1,
										},
									],
								}}
								segments={segments}
								width={handleSetChartSize()}
								height={220}
								bezier
								style={{ marginVertical: 8, borderRadius: 16 }}
								withVerticalLines={false}
								fromZero
								getDotColor={dataPoint => handleDotColor(dataPoint)}
								onDataPointClick={data => handleDataPointClick(data)}
								chartConfig={{
									decimalPlaces: 0,
									backgroundGradientFrom: '#fff',
									backgroundGradientTo: '#fff',
									fillShadowGradient: '#fff',
									fillShadowGradientTo: '#fff',
									color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
									propsForDots: {
										r: '6',
										strokeWidth: '2',
										stroke: theme.colors.white,
									},
								}}
								decorator={() => {
									return tooltipPos.visible ? (
										<View>
											<Svg>
												<Rect
													x={setTooltipPositionX()}
													y={setTooltipPositionY()}
													width={tooltipPos.value.toFixed(2).length * 10}
													height="30"
													stroke={handleDotColor(tooltipPos.value)}
													fill={theme.colors.white}
												/>
												<TextSVG
													x={setTooltipTextPositionX()}
													y={setTooltipTextPositionY()}
													fill="black"
													fontSize="16"
													fontWeight="bold"
													textAnchor="middle"
												>
													{tooltipPos.value.toFixed(2)}
												</TextSVG>
											</Svg>
										</View>
									) : null;
								}}
							/>
						</ScrollView>
					</View>
				</View>
			)}
		</>
	);
}
