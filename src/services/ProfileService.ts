import CryptoES from 'crypto-es';
import { createProfileTable, getAllProfiles, setProfile } from '../utils';
import { Profile } from '../utils';

async function getProfiles(key: string): Promise<Profile[]> {
	return new Promise(async (resolve, reject) => {
		getAllProfiles()
			.then(result => {
				if (result) {
					const decryptedData: Profile[] = [];

					result.forEach(profile => {
						decryptedData.push({
							id: profile?.id,
							name: profile?.name
								? CryptoES.AES.decrypt(profile?.name, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							birthdate: profile?.birthdate
								? CryptoES.AES.decrypt(profile?.birthdate, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							description: profile?.description
								? CryptoES.AES.decrypt(profile?.description, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							gender: profile?.gender
								? CryptoES.AES.decrypt(profile?.gender, key).toString(
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

async function createProfile(profile: Profile, key: string): Promise<boolean> {
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

				setProfile(encryptedProfile)
					.then(() => resolve(true))
					.catch(() => reject(new Error('Falha ao criar perfil')));
			})
			.catch(() => reject(new Error('Falha ao criar a tabela de perfis')));
	});
}

export const profileService = { getProfiles, createProfile };
