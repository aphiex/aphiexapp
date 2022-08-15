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

export async function setProfile(profile: Profile) {
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
