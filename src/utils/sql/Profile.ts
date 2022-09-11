import { database } from '../Database';
import { Profile, ProfileFromDB } from '../types';

export async function getAllProfiles(): Promise<ProfileFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM profile',
				[],
				(txObj, { rows: { _array } }) => {
					resolve(_array);
				},
				(txObj, error) => {
					reject(null);
					return false;
				}
			);
		});
	});
}

export async function getProfileById(
	id: number
): Promise<ProfileFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM profile WHERE profile_id = (?)',
				[id],
				(txObj, { rows: { _array } }) => {
					resolve(_array[0]);
				},
				(txObj, error) => {
					reject(null);
					return false;
				}
			);
		});
	});
}

export const createProfileTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'profile ' +
					'(profile_id INTEGER PRIMARY KEY AUTOINCREMENT, profile_name TEXT, profile_description TEXT, profile_gender TEXT, profile_birthdate TEXT);'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createProfile(profile: Profile) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				`INSERT INTO profile (profile_name, profile_description, profile_gender, profile_birthdate) VALUES (?,?,?,?)`,
				[
					profile?.name || '',
					profile?.description || '',
					profile?.gender || '',
					profile?.birthdate || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function updateProfile(profile: Profile) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				`UPDATE profile SET profile_name = (?), profile_description = (?), profile_gender = (?), profile_birthdate = (?) WHERE profile_id = (?)`,
				[
					profile?.name || '',
					profile?.description || '',
					profile?.gender || '',
					profile?.birthdate || '',
					profile?.id || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function deleteProfile(id: number): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM profile WHERE profile_id = (?)',
				[id],
				() => {
					resolve(true);
				},
				(txObj, error) => {
					reject(null);
					return false;
				}
			);
		});
	});
}
