import React from 'react';
import { View, Text, Image } from 'react-native';
import { FolderPlus, TrashCan } from '../../../assets/icons';
import {
	IconButton,
	ImageViewer,
	LoadingModal,
	PageTitle,
	PasswordRequestModalContainer,
} from '../../../components';
import theme from '../../../styles/theme';
import {
	dateMask,
	formatQuantity,
	ReferenceValue,
	Test,
	Image as ImageType,
} from '../../../utils';
import {
	HistoricalChartContainer,
	ReferenceTableContainer,
} from './components';
import { styles } from './styles';

type TTestDetail = {
	test?: Test;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	modalVisible: boolean;
	loading: boolean;
	images: ImageType[];
	referenceValues?: ReferenceValue[];
	handleDelete: () => void;
	handleGoToEditProfile: () => void;
};

export function TestDetailView({
	test,
	handleDelete,
	modalVisible,
	setModalVisible,
	loading,
	referenceValues,
	handleGoToEditProfile,
	images,
}: TTestDetail) {
	return (
		<>
			{loading && <LoadingModal />}
			{!loading && (
				<>
					<PasswordRequestModalContainer
						title={test?.testType?.name || 'Deletar Exame'}
						text="Deseja apagar este exame? Essa é uma ação irreversível. Para prosseguir informe sua senha."
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						onConfirm={handleDelete}
						loading={loading}
					/>
					<View style={styles.delete}>
						<IconButton
							title="Deletar"
							color={theme.colors.softRed}
							onPress={() => setModalVisible(true)}
							icon={<TrashCan size={24} color={theme.colors.softRed} />}
						/>
					</View>
					<View style={styles.container}>
						<View style={styles.pageTitle}>
							<PageTitle title="Visualizar Exame" icon={<FolderPlus />} />
						</View>

						<View style={styles.form}>
							<View style={styles.contentContainer}>
								<Text style={styles.title}>Nome</Text>
								<Text style={styles.content}>
									{test?.testType?.name || '-'}
								</Text>
							</View>

							<View style={styles.contentContainerRow}>
								<View style={styles.contentContainerRowItem}>
									<Text style={styles.title}>Resultado</Text>
									{test?.value ? (
										<Text style={styles.content}>
											{test?.value
												? `${formatQuantity(test?.value)}${
														test?.testType?.measurementUnit
															? ` ${test.testType.measurementUnit}`
															: ''
												  }`
												: '-'}
										</Text>
									) : (
										<Text style={styles.content}>-</Text>
									)}
								</View>

								<View style={styles.contentContainerRowItem}>
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

							{Boolean(test?.description) && (
								<View style={styles.contentContainer}>
									<Text style={styles.title}>Descrição</Text>
									<Text style={styles.content}>{test?.description || '-'}</Text>
								</View>
							)}

							{Boolean(test?.condition) && (
								<View style={styles.contentContainer}>
									<Text style={styles.title}>Informação adicional</Text>
									<Text style={styles.content}>{test?.condition}</Text>
								</View>
							)}

							<View style={styles.contentContainerChart}>
								<Text style={styles.title}>Histórico de Resultados</Text>

								<HistoricalChartContainer
									testType={test?.testType}
									referenceValues={referenceValues}
									handleGoToEditProfile={handleGoToEditProfile}
								/>
							</View>

							<View style={styles.contentContainer}>
								<Text style={styles.title}>Valores de Referência</Text>

								<ReferenceTableContainer
									referenceValues={referenceValues}
									measurementUnit={test?.testType?.measurementUnit}
								/>
							</View>

							{Boolean(images?.length > 0) && (
								<View style={styles.contentContainer}>
									<Text style={styles.title}>Imagens Anexadas</Text>
									<View style={styles.imageContainer}>
										{images?.map((image, index) => (
											<ImageViewer
												currentImage={image?.uri}
												index={index}
												images={images?.map(img => {
													return img?.uri;
												})}
												key={index}
											/>
										))}
									</View>
								</View>
							)}
						</View>
					</View>
				</>
			)}
		</>
	);
}
