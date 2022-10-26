import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Plus } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { profileService } from '../../../services';
import theme from '../../../styles/theme';
import { Profile } from '../../../utils/Types';
import { ProfileListView } from './ProfileListView';

export function ProfileListContainer({
	navigation,
}: NativeStackScreenProps<any, any>) {
	const [profiles, setProfiles] = useState<Profile[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const { auth } = useAuth();
	const { loadProfile } = useProfile();

	const selectProfile = (profile: Profile) => {
		setLoading(true);
		loadProfile(profile);
		setLoading(false);
	};

	const goToCreateProfile = () => {
		navigation.navigate('ProfileCreate');
	};

	const getProfiles = async () => {
		setLoading(true);
		profileService
			.handleGetProfiles(auth?.key || '')
			.then(result => {
				setProfiles(result);
			})
			.catch(() => {
				setProfiles([]);
			});
		setLoading(false);
	};

	useEffect(() => {
		getProfiles();
		const willFocusSubscription = navigation.addListener('focus', () => {
			getProfiles();
		});

		return willFocusSubscription;
	}, []);

	return (
		<>
			<ScreenContainer hasFooter>
				<ProfileListView
					profiles={profiles}
					loading={loading}
					selectProfile={selectProfile}
					goToCreateProfile={goToCreateProfile}
				/>
			</ScreenContainer>
			{!loading && (
				<FooterContainer
					btnMiddleTitle="Criar Perfil"
					btnMiddleOnPress={() => goToCreateProfile()}
					btnMiddleIcon={<Plus size={24} color={theme.colors.primary} />}
					btnMiddleVariant="primary"
				/>
			)}
		</>
	);
}
