import { database } from '../Database';
import { TestType, TestTypeCreate, TestTypeFromDB } from '../types';

export async function getAllTestTypes(): Promise<TestTypeFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM test_type ORDER BY test_type_name COLLATE UNICODE ASC',
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

export async function getTestTypeById(
	id: number
): Promise<TestTypeFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM test_type WHERE test_type_id = (?)',
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

export const createTestTypeTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'test_type ' +
					'(test_type_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, ' +
					'test_type_name VARCHAR (90) NOT NULL, ' +
					'test_type_measurement_unit VARCHAR (45) NOT NULL);'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createTestType(
	testType: TestTypeCreate
): Promise<number | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'INSERT INTO test_type (' +
					'test_type_name, ' +
					'test_type_measurement_unit' +
					') VALUES (?,?)',
				[testType?.name || '', testType?.measurementUnit || ''],
				(txObj, { insertId }) => {
					resolve(insertId);
				},
				(txObj, error) => {
					reject(null);
					return false;
				}
			);
		});
	});
}

export async function updateTestType(testType: TestType) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'UPDATE test_type SET ' +
					'test_type_name = (?), ' +
					'test_type_measurement_unit = (?), ' +
					'WHERE test_type_id = (?)',
				[
					testType?.name || '',
					testType?.measurementUnit || '',
					testType?.id || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function deleteTestType(id: number): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM test_type WHERE test_type_id = (?)',
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
