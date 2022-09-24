import { database } from '../Database';
import { Test, TestCreate, TestFromDB } from '../types';

export async function getAllTests(): Promise<TestFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM test ' +
					'LEFT JOIN test_type ' +
					'ON test.test_type_id = test_type.test_type_id',
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

export async function getTestById(id: number): Promise<TestFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM test ' +
					'LEFT JOIN test_type ' +
					'ON test.test_type_id = test_type.test_type_id ' +
					'WHERE test_id = (?)',
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

export const createTestTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'test ' +
					'(test_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
					'test_value TEXT, ' +
					'test_date TEXT, ' +
					'test_description TEXT, ' +
					'test_image TEXT, ' +
					'profile_id INTEGER, ' +
					'test_type_id INTEGER, ' +
					'FOREIGN KEY(profile_id) REFERENCES profile(profile_id), ' +
					'FOREIGN KEY(test_type_id) REFERENCES test_type(test_type_id));'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createTest(test: TestCreate) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'INSERT INTO test (' +
					'test_value, ' +
					'test_date, ' +
					'test_description, ' +
					'test_image, ' +
					'profile_id, ' +
					'test_type_id' +
					') VALUES (?,?,?,?,?,?)',
				[
					test?.value || '',
					test?.date || '',
					test?.description || '',
					test?.image || '',
					test?.profileId || '',
					test?.testTypeId || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function updateTest(test: Test) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'UPDATE test SET ' +
					'test_value = (?), ' +
					'test_date = (?), ' +
					'test_description = (?), ' +
					'test_image = (?), ' +
					'profile_id = (?), ' +
					'test_type_id = (?) ' +
					'WHERE test_id = (?)',
				[
					test?.value || '',
					test?.date || '',
					test?.description || '',
					test?.image || '',
					test?.profileId || '',
					test?.testType?.id || '',
					test?.id || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function deleteTest(id: number): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM test WHERE test_id = (?)',
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
