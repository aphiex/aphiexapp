import { database } from '../Database';
import {
	ReferenceValue,
	ReferenceValueCreate,
	ReferenceValueFromDB,
} from '../types';

export async function getAllReferenceValues(): Promise<
	ReferenceValueFromDB[] | null
> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM reference_value ' +
					'LEFT JOIN test_type ' +
					'ON reference_value.test_type_id = test_type.test_type_id',
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

export async function getReferenceValueById(
	id: number
): Promise<ReferenceValueFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM reference_value ' +
					'LEFT JOIN test_type ' +
					'ON reference_value.test_type_id = test_type.test_type_id ' +
					'WHERE reference_value_id = (?)',
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

export async function getReferenceValueByTestType(
	testTypeId: number
): Promise<ReferenceValueFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM reference_value ' + `WHERE test_type_id = ${testTypeId}`,
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

export async function getReferenceConditionsByTestType(
	testTypeId: number
): Promise<ReferenceValueFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM reference_value ' +
					`WHERE test_type_id = ${testTypeId} ` +
					'AND reference_value_condition IS NOT NULL',
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

export const createReferenceValueTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'reference_value ' +
					'(reference_value_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, ' +
					'reference_value_gender CHAR (1) NOT NULL, ' +
					'reference_value_min_value REAL, ' +
					'reference_value_max_value REAL, ' +
					'reference_value_min_age INTEGER, ' +
					'reference_value_max_age INTEGER, ' +
					'reference_value_condition VARCHAR (90), ' +
					'test_type_id INTEGER NOT NULL, ' +
					'FOREIGN KEY(test_type_id) REFERENCES test_type(test_type_id));'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createReferenceValue(
	referenceValue: ReferenceValueCreate
) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'INSERT INTO test (' +
					'reference_value_gender, ' +
					'reference_value_min_value, ' +
					'reference_value_max_value, ' +
					'reference_value_min_age, ' +
					'reference_value_max_age, ' +
					'reference_value_condition, ' +
					'test_type_id' +
					') VALUES (?,?,?,?,?,?)',
				[
					referenceValue?.gender || '',
					referenceValue?.minValue || '',
					referenceValue?.maxValue || '',
					referenceValue?.minAge || '',
					referenceValue?.maxAge || '',
					referenceValue?.condition || '',
					referenceValue?.testTypeId || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function updateReferenceValue(referenceValue: ReferenceValue) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'UPDATE test SET ' +
					'reference_value_gender = (?), ' +
					'reference_value_min_value = (?), ' +
					'reference_value_max_value = (?), ' +
					'reference_value_min_age = (?), ' +
					'reference_value_max_age = (?), ' +
					'reference_value_condition = (?), ' +
					'test_type_id = (?) ' +
					'WHERE reference_value_id = (?)',
				[
					referenceValue?.gender || '',
					referenceValue?.minValue || '',
					referenceValue?.maxValue || '',
					referenceValue?.minAge || '',
					referenceValue?.maxAge || '',
					referenceValue?.condition || '',
					referenceValue?.testType?.id || '',
					referenceValue?.id || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function deleteReferenceValue(
	id: number
): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM reference_value WHERE reference_value_id = (?)',
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
