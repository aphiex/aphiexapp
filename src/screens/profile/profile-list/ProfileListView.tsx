import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Logo } from '../../../assets/icons';
import { CustomButton, LoadingState } from '../../../components';
import { Profile } from '../../../utils/Types';

type TProfileList = {
	styles: any;
	profiles: Profile[] | undefined;
	loading: boolean;
	selectProfile: (profile: Profile) => void;
	goToCreateProfile: () => void;
};

export function ProfileListView({
	styles,
	loading,
	profiles,
	selectProfile,
	goToCreateProfile,
}: TProfileList) {
	return (
		<View style={styles.container}>
			<Logo />

			<Text style={styles.title}>Acessar Perfil</Text>

			{loading && <LoadingState />}

			{!loading && (!profiles || profiles?.length === 0) && (
				<View style={styles.button}>
					<CustomButton
						title="Criar Perfil"
						onPress={() => goToCreateProfile()}
					/>
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
									{profile?.name || ''}
								</Text>
								{profile?.description ? (
									<Text numberOfLines={1} style={styles.description}>
										{profile?.description || ''}
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
