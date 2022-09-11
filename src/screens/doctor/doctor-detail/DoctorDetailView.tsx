import React from 'react';
import { View, Text } from 'react-native';
import { MaskedText } from 'react-native-mask-text';
import { CardAccountDetails, TrashCan } from '../../../assets/icons';
import {
	IconButton,
	PageTitle,
	PasswordRequestModalContainer,
} from '../../../components';
import theme from '../../../styles/theme';
import { Doctor } from '../../../utils';
import { styles } from './styles';

type TDoctorDetail = {
	doctor?: Doctor;
	handleDelete: () => void;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	modalVisible: boolean;
	loading: boolean;
};

export function DoctorDetailView({
	doctor,
	handleDelete,
	modalVisible,
	setModalVisible,
	loading,
}: TDoctorDetail) {
	return (
		<>
			<PasswordRequestModalContainer
				title={doctor?.name || 'Deletar Médico'}
				text="Deseja apagar este médico? Essa é uma ação irreversível. Para prosseguir informe sua senha."
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				onConfirm={handleDelete}
				loading={loading}
			/>
			<View style={{ position: 'absolute', right: 0, top: 0 }}>
				<IconButton
					title="Deletar"
					color={theme.colors.softRed}
					onPress={() => setModalVisible(true)}
					icon={<TrashCan size={24} color={theme.colors.softRed} />}
				/>
			</View>
			<View style={styles.container}>
				<PageTitle title="Visualizar Médico" icon={<CardAccountDetails />} />

				<View style={styles.form}>
					<View style={styles.contentContainer}>
						<Text style={styles.title}>Nome</Text>
						<Text style={styles.content}>{doctor?.name || '-'}</Text>
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
							<Text style={styles.title}>Telefone</Text>
							{doctor?.fixedPhone ? (
								<MaskedText
									mask={doctor?.fixedPhone ? '(99) 9999-9999' : 'A'}
									style={styles.content}
								>
									{doctor?.fixedPhone}
								</MaskedText>
							) : (
								<Text style={styles.content}>-</Text>
							)}
						</View>

						<View>
							<Text style={styles.title}>Celular</Text>
							{doctor?.mobilePhone ? (
								<MaskedText
									mask={doctor?.mobilePhone ? '(99) 99999-9999' : 'A'}
									style={styles.content}
								>
									{doctor?.mobilePhone}
								</MaskedText>
							) : (
								<Text style={styles.content}>-</Text>
							)}
						</View>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Email</Text>
						<Text style={styles.content}>{doctor?.email || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Especialidade</Text>
						<Text style={styles.content}>{doctor?.specialty || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>CRM</Text>
						<Text style={styles.content}>{doctor?.crm || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Endereço</Text>
						<Text style={styles.content}>{doctor?.address || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Cidade</Text>
						<Text style={styles.content}>{doctor?.city?.name || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Estado</Text>
						<Text style={styles.content}>{doctor?.city?.state || '-'}</Text>
					</View>
				</View>
			</View>
		</>
	);
}
