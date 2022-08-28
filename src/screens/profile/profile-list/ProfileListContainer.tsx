import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Plus } from '../../../assets/icons';
import { FooterContainer, ScreenContainer } from '../../../components';
import { useAuth, useProfile } from '../../../context';
import { profileService } from '../../../services';
import theme from '../../../styles/theme';
import { Profile } from '../../../utils/Types';
import { ProfileListView } from './ProfileListView';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		marginTop: '50%',
	},
	listContainer: {
		marginTop: 18,
		width: '100%',
	},
	listItem: {
		borderBottomColor: theme.colors.softGray,
		borderBottomWidth: 2,
		paddingHorizontal: 16,
		paddingVertical: 12,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	title: {
		fontSize: 30,
		fontFamily: theme.fonts.regular400,
		color: theme.colors.black,
		textAlign: 'center',
		marginTop: 10,
	},
	icon: {
		backgroundColor: theme.colors.primary,
		height: 40,
		width: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 180,
	},
	text: {
		fontSize: 16,
		fontFamily: theme.fonts.regular400,
		color: theme.colors.black,
	},
	textIcon: {
		fontSize: 14,
		fontFamily: theme.fonts.medium500,
		color: theme.colors.white,
	},
	description: {
		fontSize: 14,
		fontFamily: theme.fonts.regular400,
		color: theme.colors.grey,
		marginTop: 2,
	},
	textContainer: {
		marginLeft: 14,
		display: 'flex',
		flexDirection: 'column',
	},
});

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
	}, []);

	return (
		<>
			<ScreenContainer hasFooter>
				<ProfileListView
					styles={styles}
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
