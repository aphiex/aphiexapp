import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Logo } from '../../assets/icons';
import { CustomButton, LoadingState, PageTitle } from '../../components';
import { TAuthData } from '../../context';
import { profileService } from '../../services';
import { Profile } from '../../utils/Types';

type TProfile = {
	styles: any;
	profiles: Profile[] | undefined;
	loading: boolean;
	setTest: React.Dispatch<React.SetStateAction<number>>;
	test: number;
	auth: TAuthData | undefined;
	selectProfile: (profile: Profile) => void;
};

export function ProfileView({
	styles,
	loading,
	profiles,
	setTest,
	test,
	auth,
	selectProfile,
}: TProfile) {
	return (
		<View style={styles.container}>
			<Logo />

			<Text style={styles.title}>Acessar Perfil</Text>

			{loading && <LoadingState />}

			{!loading && (!profiles || profiles?.length === 0) && (
				<View style={styles.button}>
					<CustomButton title="Criar Perfil" />
				</View>
			)}

			{!loading && profiles && profiles.length > 0 && (
				<View style={styles.listContainer}>
					{profiles.map(profile => (
						<Pressable
							key={profile?.id}
							style={styles.listItem}
							onPress={() => selectProfile(profile)}
						>
							<View style={styles.icon}>
								<Text style={styles.textIcon}>
									{profile?.name?.charAt(0).toUpperCase() || '?'}
								</Text>
							</View>
							<View style={styles.textContainer}>
								<Text numberOfLines={1} style={styles.text}>
									{profile?.name}
								</Text>
								{profile?.description && (
									<Text numberOfLines={1} style={styles.description}>
										{profile?.description}
									</Text>
								)}
							</View>
						</Pressable>
					))}
				</View>
			)}
			<View style={{ marginTop: 10 }}>
				<CustomButton
					title="Gerar Perfil"
					onPress={() => {
						profileService
							.createProfile(
								{
									name: 'Daniel Pádua',
									description: 'Filho',
									gender: 'M',
									birthdate: '31/03/1998',
								},
								auth?.key || ''
							)
							.then(result => {
								setTest(test + 1);
							})
							.catch(error => console.log(error));
					}}
				/>
			</View>
		</View>
	);
}
