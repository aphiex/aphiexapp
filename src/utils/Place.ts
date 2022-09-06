import { database } from './Database';
import { Place, PlaceFromBD } from './Types';

export async function getAllPlaces(): Promise<PlaceFromBD[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM place',
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

export async function getPlaceById(id: number): Promise<PlaceFromBD | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM place WHERE id = (?)',
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

export const createPlaceTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'place ' +
					'(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fixed_phone TEXT, mobile_phone TEXT, email TEXT, address TEXT, city_id INTEGER);'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createPlace(place: Place) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				`INSERT INTO place (name, fixed_phone, mobile_phone, email, address, city_id) VALUES (?,?,?,?,?,?)`,
				[
					place?.name || '',
					place?.fixedPhone || '',
					place?.mobilePhone || '',
					place?.email || '',
					place?.address || '',
					place?.cityId || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function updatePlace(place: Place) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				`UPDATE place SET name = (?), fixed_phone = (?), mobile_phone = (?), email = (?), address = (?), city_id = (?) WHERE id = (?)`,
				[
					place?.name || '',
					place?.fixedPhone || '',
					place?.mobilePhone || '',
					place?.email || '',
					place?.address || '',
					place?.cityId || '',
					place?.id || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function deletePlace(id: number): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM place WHERE id = (?)',
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
