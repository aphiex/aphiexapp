import { database } from './Database';
import { Profile } from './Types';

export async function getAllProfiles(): Promise<Profile[] | null> {
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

export async function getProfileById(id: number): Promise<Profile | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM profile WHERE id = (?)',
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
					'(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, gender TEXT, birthdate TEXT);'
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
				`INSERT INTO profile (name, description, gender, birthdate) VALUES (?,?,?,?)`,
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
				`UPDATE profile SET name = (?), description = (?), gender = (?), birthdate = (?) WHERE id = (?)`,
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
				'DELETE FROM profile WHERE id = (?)',
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
