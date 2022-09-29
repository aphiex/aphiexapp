import React from 'react';
import { View, Text } from 'react-native';
import { FolderPlus, TrashCan } from '../../../assets/icons';
import {
	IconButton,
	PageTitle,
	PasswordRequestModalContainer,
} from '../../../components';
import theme from '../../../styles/theme';
import { dateMask, Test } from '../../../utils';
import { HistoricalChartContainer } from './components';
import { styles } from './styles';

type TTestDetail = {
	test?: Test;
	handleDelete: () => void;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	modalVisible: boolean;
	loading: boolean;
};

export function TestDetailView({
	test,
	handleDelete,
	modalVisible,
	setModalVisible,
	loading,
}: TTestDetail) {
	return (
		<>
			<PasswordRequestModalContainer
				title={test?.testType?.name || 'Deletar Exame'}
				text="Deseja apagar este exame? Essa é uma ação irreversível. Para prosseguir informe sua senha."
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				onConfirm={handleDelete}
				loading={loading}
			/>
			<View
				style={{
					position: 'absolute',
					right: 0,
					top: 0,
					paddingHorizontal: 18,
					paddingTop: 20,
				}}
			>
				<IconButton
					title="Deletar"
					color={theme.colors.softRed}
					onPress={() => setModalVisible(true)}
					icon={<TrashCan size={24} color={theme.colors.softRed} />}
				/>
			</View>
			<View style={styles.container}>
				<View style={{ paddingHorizontal: 18, paddingTop: 20 }}>
					<PageTitle title="Visualizar Exame" icon={<FolderPlus />} />
				</View>

				<View style={styles.form}>
					<View style={styles.contentContainer}>
						<Text style={styles.title}>Nome</Text>
						<Text style={styles.content}>{test?.testType.name || '-'}</Text>
					</View>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginBottom: 40,
						}}
					>
						<View>
							<Text style={styles.title}>Resultado</Text>
							{test?.value ? (
								<Text style={styles.content}>
									{test?.value
										? `${test?.value}${
												test.testType.measurementUnit
													? ` ${test.testType.measurementUnit}`
													: ''
										  }`
										: '-'}
								</Text>
							) : (
								<Text style={styles.content}>-</Text>
							)}
						</View>

						<View>
							<Text style={styles.title}>Data</Text>
							{test?.date ? (
								<Text style={styles.content}>
									{dateMask(new Date(test?.date))}
								</Text>
							) : (
								<Text style={styles.content}>-</Text>
							)}
						</View>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Descrição</Text>
						<Text style={styles.content}>{test?.description || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Histórico de Resultados</Text>
						<HistoricalChartContainer />
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Valores de Referência</Text>
						<Text style={styles.content}>{'-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Anexos</Text>
						<Text style={styles.content}>{'-'}</Text>
					</View>
				</View>
			</View>
		</>
	);
}
