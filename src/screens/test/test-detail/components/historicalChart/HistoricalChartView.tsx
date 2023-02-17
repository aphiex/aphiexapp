import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Text as TextSVG, Svg } from 'react-native-svg';
import theme from '../../../../../styles/theme';
import {
	proportionalResize,
	ReferenceValue,
	TestType,
} from '../../../../../utils';
import { styles } from './styles';
import {
	TChartDot,
	TDataPoint,
	TTestWithReferenceValue,
} from './HistoricalChartContainer';

type THistoricalChartView = {
	tests?: TTestWithReferenceValue[];
	testType?: TestType;
	tooltipPos: TChartDot;
	loading: boolean;
	segments: number;
	segmentsIndexs: number[];
	incompleteProfile: boolean;
	referenceValues?: ReferenceValue[];
	handleDataPointClick: (data: TDataPoint) => void;
	handleDotColor: (dataPoint: number, index: number) => string;
	setTooltipPositionX: () => number;
	setTooltipPositionY: () => number;
	setTooltipTextPositionX: () => number;
	setTooltipTextPositionY: () => number;
	handleSetMeasurementSegments: (index: number) => number;
	handleGoToEditProfile: () => void;
	handleTestValues: () => number[];
	handleMinReferenceValues: () => number[];
	handleMaxReferenceValues: () => number[];
	handleLabels: () => string[];
	setLabelFontSize: () => number;
	setLabelRotation: () => number;
	setLabelOffset: () => number;
};

export function HistoricalChartView({
	tests,
	loading,
	segments,
	segmentsIndexs,
	incompleteProfile,
	referenceValues,
	tooltipPos,
	handleDataPointClick,
	handleDotColor,
	setTooltipPositionX,
	setTooltipPositionY,
	setTooltipTextPositionX,
	setTooltipTextPositionY,
	handleGoToEditProfile,
	testType,
	handleSetMeasurementSegments,
	handleTestValues,
	handleMinReferenceValues,
	handleMaxReferenceValues,
	handleLabels,
	setLabelFontSize,
	setLabelRotation,
	setLabelOffset,
}: THistoricalChartView) {
	return (
		<>
			{loading && (
				<ActivityIndicator
					size="large"
					color={theme.colors.primary}
					style={styles.loading}
				/>
			)}

			{!loading && incompleteProfile && (
				<View>
					<Text style={styles.content}>
						Para visualizar este conteúdo é necessário que os campos 'Sexo' e
						'Data de Nascimento' do seu perfil estejam preenchidos
					</Text>

					<Text onPress={() => handleGoToEditProfile()} style={styles.link}>
						Clique aqui para editar seu perfil!
					</Text>
				</View>
			)}

			{!loading && (!tests || tests?.length === 0) && !incompleteProfile && (
				<Text style={styles.content}>Não foi possível gerar o gráfico</Text>
			)}

			{!loading && !incompleteProfile && tests?.length === 1 && (
				<Text style={styles.content}>
					Para gerar o gráfico é necessário que ao menos dois exames do mesmo
					tipo estejam cadastrados
				</Text>
			)}

			{!loading && !incompleteProfile && tests?.length > 1 && (
				<View>
					<View style={styles.infoContainer}>
						<Text style={styles.legend}>{testType?.measurementUnit || ''}</Text>

						{!referenceValues ||
							(referenceValues?.length === 0 && (
								<Text style={styles.legend}>
									*Gráfico sem valor de referência
								</Text>
							))}
					</View>

					<View style={styles.measurementPosition}>
						<View style={styles.measurementContainer}>
							{segmentsIndexs?.map(index => (
								<Text
									key={index}
									style={[
										styles.measurementValue,
										{ marginTop: index === 0 ? 0 : proportionalResize(16.9) },
									]}
								>
									{handleSetMeasurementSegments(index)}
								</Text>
							))}
						</View>

						<LineChart
							data={{
								labels: handleLabels(),
								datasets: [
									{
										data: handleTestValues(),
										strokeWidth: proportionalResize(2),
									},
									{
										data: handleMaxReferenceValues(),
										withDots: false,
										color: () => theme.colors.red,
										strokeWidth: proportionalResize(1),
									},
									{
										data: handleMinReferenceValues(),
										withDots: false,
										color: () => theme.colors.red,
										strokeWidth: proportionalResize(1),
									},
								],
							}}
							chartConfig={{
								decimalPlaces: 0,
								backgroundGradientFrom: '#fff',
								backgroundGradientTo: '#fff',
								fillShadowGradient: '#fff',
								fillShadowGradientTo: '#fff',
								color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
								propsForLabels: {
									fontSize: setLabelFontSize(),
								},
								propsForBackgroundLines: {
									strokeWidth: proportionalResize(1),
									x: proportionalResize(-20),
								},
								propsForDots: {
									r: proportionalResize(6),
									strokeWidth: proportionalResize(1),
									stroke: theme.colors.white,
								},
							}}
							decorator={() => {
								return tooltipPos?.visible ? (
									<View>
										<Svg>
											<Rect
												x={setTooltipPositionX()}
												y={setTooltipPositionY()}
												width={proportionalResize(
													tooltipPos?.value?.toFixed(2)?.length * 10
												)}
												height={proportionalResize(30)}
												stroke={handleDotColor(
													tooltipPos?.value,
													tooltipPos?.index
												)}
												fill={theme.colors.white}
											/>
											<TextSVG
												x={setTooltipTextPositionX()}
												y={setTooltipTextPositionY()}
												fill="black"
												fontSize={proportionalResize(16)}
												fontWeight="bold"
												textAnchor="middle"
											>
												{tooltipPos?.value?.toFixed(2)}
											</TextSVG>
										</Svg>
									</View>
								) : null;
							}}
							getDotColor={(dataPoint, index) =>
								handleDotColor(dataPoint, index)
							}
							verticalLabelRotation={setLabelRotation()}
							xLabelsOffset={setLabelOffset()}
							withHorizontalLabels={false}
							segments={segments}
							width={proportionalResize(410)}
							height={proportionalResize(220)}
							bezier
							style={styles.lineChart}
							withVerticalLines={false}
							fromZero
							onDataPointClick={data => handleDataPointClick(data)}
						/>

						{referenceValues?.length > 0 && (
							<View style={styles.legendContainer}>
								<View style={styles.legendContent}>
									<View style={styles.blueCircle} />
									<Text style={styles.legend}>Normal</Text>
								</View>

								<View style={styles.legendContent}>
									<View style={styles.redCircle} />
									<Text style={styles.legend}>Fora do padrão</Text>
								</View>

								<View style={styles.legendContent}>
									<View style={styles.greyCircle} />
									<Text style={styles.legend}>Sem valor de referência</Text>
								</View>

								<View style={styles.legendContent}>
									<View style={styles.redLine} />
									<Text style={styles.legend}>
										Intervalo desejado de acordo com o seu perfil
									</Text>
								</View>

								<View style={styles.lastLegendContent}>
									<Text style={styles.legend}>
										*Clique nos pontos para ver os valores
									</Text>
								</View>
							</View>
						)}
					</View>
				</View>
			)}
		</>
	);
}
