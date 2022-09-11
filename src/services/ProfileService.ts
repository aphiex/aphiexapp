import CryptoES from 'crypto-es';
import {
	createProfile,
	createProfileTable,
	deleteProfile,
	getAllProfiles,
	getProfileById,
	updateProfile,
} from '../utils';
import { Profile } from '../utils';

async function handleGetProfiles(key: string): Promise<Profile[]> {
	return new Promise(async (resolve, reject) => {
		getAllProfiles()
			.then(result => {
				if (result) {
					const decryptedData: Profile[] = [];

					result.forEach(profile => {
						decryptedData.push({
							id: profile?.profile_id,
							name: profile?.profile_name
								? CryptoES.AES.decrypt(profile?.profile_name, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							birthdate: profile?.profile_birthdate
								? CryptoES.AES.decrypt(
										profile?.profile_birthdate,
										key
								  ).toString(CryptoES.enc.Utf8)
								: '',
							description: profile?.profile_description
								? CryptoES.AES.decrypt(
										profile?.profile_description,
										key
								  ).toString(CryptoES.enc.Utf8)
								: '',
							gender: profile?.profile_gender
								? CryptoES.AES.decrypt(profile?.profile_gender, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
						});
					});

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter perfis'));
			})
			.catch(() => reject(new Error('Falha ao obter perfis')));
	});
}

async function handleGetProfileById(key: string, id: number): Promise<Profile> {
	return new Promise(async (resolve, reject) => {
		getProfileById(id)
			.then(result => {
				if (result) {
					const decryptedData: Profile = {
						id: result?.profile_id,
						name: result?.profile_name
							? CryptoES.AES.decrypt(result?.profile_name, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						birthdate: result?.profile_birthdate
							? CryptoES.AES.decrypt(result?.profile_birthdate, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						description: result?.profile_description
							? CryptoES.AES.decrypt(result?.profile_description, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						gender: result?.profile_gender
							? CryptoES.AES.decrypt(result?.profile_gender, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
					};

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter perfil'));
			})
			.catch(() => reject(new Error('Falha ao obter perfil')));
	});
}

async function handleCreateProfile(
	profile: Profile,
	key: string
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createProfileTable()
			.then(() => {
				const encryptedProfile: Profile = {
					name: profile?.name
						? CryptoES.AES.encrypt(profile?.name, key).toString()
						: '',
					description: profile?.description
						? CryptoES.AES.encrypt(profile?.description, key).toString()
						: '',
					birthdate: profile?.birthdate
						? CryptoES.AES.encrypt(profile?.birthdate, key).toString()
						: '',
					gender: profile?.gender
						? CryptoES.AES.encrypt(profile?.gender, key).toString()
						: '',
				};

				createProfile(encryptedProfile)
					.then(() => resolve(true))
					.catch(() => reject(new Error('Falha ao criar perfil')));
			})
			.catch(() => reject(new Error('Falha ao criar perfil')));
	});
}

async function handleUpdateProfile(
	profile: Profile,
	key: string
): Promise<Profile> {
	return new Promise(async (resolve, reject) => {
		const encryptedProfile: Profile = {
			id: profile?.id,
			name: profile?.name
				? CryptoES.AES.encrypt(profile?.name, key).toString()
				: '',
			description: profile?.description
				? CryptoES.AES.encrypt(profile?.description, key).toString()
				: '',
			birthdate: profile?.birthdate
				? CryptoES.AES.encrypt(profile?.birthdate, key).toString()
				: '',
			gender: profile?.gender
				? CryptoES.AES.encrypt(profile?.gender, key).toString()
				: '',
		};

		updateProfile(encryptedProfile)
			.then(() => resolve(profile))
			.catch(() => reject(new Error('Falha ao editar perfil')));
	});
}

async function handleDeleteProfile(profileId: number): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteProfile(profileId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar perfil')));
	});
}

export const profileService = {
	handleGetProfiles,
	handleCreateProfile,
	handleGetProfileById,
	handleDeleteProfile,
	handleUpdateProfile,
};
