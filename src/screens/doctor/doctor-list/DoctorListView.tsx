import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CardAccountDetails } from '../../../assets/icons';
import { CustomButton, LoadingState, PageTitle } from '../../../components';
import { Doctor } from '../../../utils/Types';
import { styles } from './styles';

type TDoctorListView = {
	doctors: Doctor[] | undefined;
	loading: boolean;
	selectDoctor: (id?: number) => void;
	goToCreateDoctor: () => void;
};

export function DoctorListView({
	loading,
	doctors,
	selectDoctor,
	goToCreateDoctor,
}: TDoctorListView) {
	return (
		<View style={styles.container}>
			<PageTitle title="Médicos" icon={<CardAccountDetails />} />

			{loading && <LoadingState />}

			{!loading && (!doctors || doctors?.length === 0) && (
				<View style={styles.button}>
					<CustomButton
						title="Cadastrar Médico"
						onPress={() => goToCreateDoctor()}
					/>
				</View>
			)}

			{!loading && doctors && doctors.length > 0 && (
				<View style={styles.listContainer}>
					{doctors.map(doctor => (
						<Pressable
							key={doctor?.id}
							style={styles.listItem}
							onPress={() => selectDoctor(doctor?.id)}
						>
							<View style={styles.icon}>
								<Text style={styles.textIcon}>
									{doctor?.name?.charAt(0).toUpperCase() || '?'}
								</Text>
							</View>
							<View style={styles.textContainer}>
								<Text numberOfLines={1} style={styles.text}>
									{doctor?.name || ''}
								</Text>
								{doctor?.specialty ? (
									<Text numberOfLines={1} style={styles.description}>
										{doctor?.specialty || ''}
									</Text>
								) : (
									<View />
								)}
							</View>
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
}
