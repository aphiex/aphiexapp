import { database } from '../Database';
import { City, CityFromDB } from '../types';

export async function getCitiesByState(
	state: string
): Promise<CityFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM city WHERE city_state = (?) ORDER BY city_name ASC',
				[state],
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

export async function getCityById(id: number): Promise<CityFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM city WHERE city_id = (?)',
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
