import { database } from './Database';
import { Doctor, DoctorFromBD } from './Types';

export async function getAllDoctors(): Promise<DoctorFromBD[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM doctor',
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

export async function getDoctorById(id: number): Promise<DoctorFromBD | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM doctor WHERE id = (?)',
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

export const createDoctorTable = async () => {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'doctor ' +
					'(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fixed_phone TEXT, mobile_phone TEXT, email TEXT, specialty TEXT, crm TEXT, address TEXT, city_id INTEGER);'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createDoctor(doctor: Doctor) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				`INSERT INTO doctor (name, fixed_phone, mobile_phone, email, specialty, crm, address, city_id) VALUES (?,?,?,?,?,?,?,?)`,
				[
					doctor?.name || '',
					doctor?.fixedPhone || '',
					doctor?.mobilePhone || '',
					doctor?.email || '',
					doctor?.specialty || '',
					doctor?.crm || '',
					doctor?.address || '',
					doctor?.cityId || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function updateDoctor(doctor: Doctor) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				`UPDATE doctor SET name = (?), fixed_phone = (?), mobile_phone = (?), email = (?), specialty = (?), crm = (?), address = (?), city_id = (?) WHERE id = (?)`,
				[
					doctor?.name || '',
					doctor?.fixedPhone || '',
					doctor?.mobilePhone || '',
					doctor?.email || '',
					doctor?.specialty || '',
					doctor?.crm || '',
					doctor?.address || '',
					doctor?.cityId || '',
					doctor?.id || '',
				]
			);
		});
	} catch (error) {
		return error;
	}
}

export async function deleteDoctor(id: number): Promise<boolean | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'DELETE FROM doctor WHERE id = (?)',
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
