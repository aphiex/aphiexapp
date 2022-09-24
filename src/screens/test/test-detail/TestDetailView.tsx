import React from 'react';
import { View, Text } from 'react-native';
import { MaskedText } from 'react-native-mask-text';
import { HospitalBuilding, TrashCan } from '../../../assets/icons';
import {
	IconButton,
	PageTitle,
	PasswordRequestModalContainer,
} from '../../../components';
import theme from '../../../styles/theme';
import { Place } from '../../../utils';
import { styles } from './styles';

type TTestDetail = {
	place?: Place;
	handleDelete: () => void;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	modalVisible: boolean;
	loading: boolean;
};

export function TestDetailView({
	place,
	handleDelete,
	modalVisible,
	setModalVisible,
	loading,
}: TTestDetail) {
	return (
		<>
			<PasswordRequestModalContainer
				title={place?.name || 'Deletar Local'}
				text="Deseja apagar este local? Essa é uma ação irreversível. Para prosseguir informe sua senha."
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
				<PageTitle title="Visualizar Local" icon={<HospitalBuilding />} />

				<View style={styles.form}>
					<View style={styles.contentContainer}>
						<Text style={styles.title}>Nome</Text>
						<Text style={styles.content}>{place?.name || '-'}</Text>
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
							{place?.fixedPhone ? (
								<MaskedText
									mask={place?.fixedPhone ? '(99) 9999-9999' : ''}
									style={styles.content}
								>
									{place?.fixedPhone}
								</MaskedText>
							) : (
								<Text style={styles.content}>-</Text>
							)}
						</View>

						<View>
							<Text style={styles.title}>Celular</Text>
							{place?.mobilePhone ? (
								<MaskedText
									mask={place?.mobilePhone ? '(99) 99999-9999' : ''}
									style={styles.content}
								>
									{place?.mobilePhone}
								</MaskedText>
							) : (
								<Text style={styles.content}>-</Text>
							)}
						</View>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Email</Text>
						<Text style={styles.content}>{place?.email || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Endereço</Text>
						<Text style={styles.content}>{place?.address || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Cidade</Text>
						<Text style={styles.content}>{place?.city?.name || '-'}</Text>
					</View>

					<View style={styles.contentContainer}>
						<Text style={styles.title}>Estado</Text>
						<Text style={styles.content}>{place?.city?.state || '-'}</Text>
					</View>
				</View>
			</View>
		</>
	);
}
