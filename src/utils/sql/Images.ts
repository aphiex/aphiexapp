import { database } from '../Database';
import { ImageCreate, ImageFromDB } from '../types';

export async function getImagesByTest(
	testId: number
): Promise<ImageFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				`SELECT * FROM image WHERE test_id = ${testId}`,
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

export const createImageTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'image ' +
					'(image_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, ' +
					'image_uri TEXT, ' +
					'test_id INTEGER NOT NULL, ' +
					'FOREIGN KEY(test_id) REFERENCES test(test_id));'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createImage(image: ImageCreate): Promise<number | null> {
	try {
		(await database).transaction(tx => {
			tx.executeSql('INSERT INTO image (image_uri, test_id) VALUES (?,?)', [
				image?.uri,
				image?.testId,
			]);
		});
	} catch (error) {
		return error;
	}
}

export async function deleteImagesByTestId(
	testId: number
): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM image WHERE test_id = (?)',
				[testId],
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
