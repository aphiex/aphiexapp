import { createContext, useContext, useState } from 'react';
import { Profile } from '../utils';

type TProfileContext = {
	currentProfile?: Profile;
	loadProfile: (profile: Profile) => void;
	leaveProfile: () => void;
};

export const ProfileContext = createContext<TProfileContext>(
	{} as TProfileContext
);

export const ProfileProvider: React.FC = ({ children }) => {
	const [currentProfile, setCurrentProfile] = useState<Profile>();

	async function loadProfile(profile: Profile) {
		if (profile) setCurrentProfile(profile);
	}

	function leaveProfile() {
		setCurrentProfile(undefined);
	}

	return (
		<ProfileContext.Provider
			value={{ currentProfile, loadProfile, leaveProfile }}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export function useProfile() {
	const context = useContext(ProfileContext);
	return context;
}
