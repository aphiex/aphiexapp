import { database } from './Database';

export const createSettingsTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'settings ' +
					'(id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function getPassWord(): Promise<string | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT value FROM settings',
				[],
				(txObj, { rows: { _array } }) => {
					resolve(_array[0].value);
				},
				(txObj, error) => {
					reject(null);
					return false;
				}
			);
		});
	});
}

export async function setPassword(password: string) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(`INSERT INTO settings (value) VALUES (?)`, [password]);
		});
	} catch (error) {
		return error;
	}
}
