import { database } from '../Database';
import { Place, PlaceFromDB, PlaceCreate } from '../types';

export async function getAllPlaces(): Promise<PlaceFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM place ' +
					'LEFT JOIN city ' +
					'ON place.city_id = city.city_id',
				[],
				(txObj, { rows: { _array } }) => {
					resolve(_array);
				},
				(txObj, error) => {
					reject(error);
					return false;
				}
			);
		});
	});
}

export async function getPlaceById(id: number): Promise<PlaceFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM place ' +
					'LEFT JOIN city ' +
					'ON place.city_id = city.city_id ' +
					'WHERE place_id = (?)',
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
					'(place_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
					'place_name TEXT, ' +
					'place_fixed_phone TEXT, ' +
					'place_mobile_phone TEXT, ' +
					'place_email TEXT, ' +
					'place_address TEXT, ' +
					'city_id INTEGER, ' +
					'FOREIGN KEY(city_id) REFERENCES city(city_id));'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createPlace(place: PlaceCreate) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'INSERT INTO place (' +
					'place_name, ' +
					'place_fixed_phone, ' +
					'place_mobile_phone, ' +
					'place_email, ' +
					'place_address, ' +
					'city_id' +
					') VALUES (?,?,?,?,?,?)',
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
				'UPDATE place SET ' +
					'place_name = (?), ' +
					'place_fixed_phone = (?), ' +
					'place_mobile_phone = (?), ' +
					'place_email = (?), ' +
					'place_address = (?), ' +
					'city_id = (?) ' +
					'WHERE place_id = (?)',
				[
					place?.name || '',
					place?.fixedPhone || '',
					place?.mobilePhone || '',
					place?.email || '',
					place?.address || '',
					place?.city?.id || '',
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
				'DELETE FROM place WHERE place_id = (?)',
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
