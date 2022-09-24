import { database } from '../Database';
import { Doctor, DoctorCreate, DoctorFromDB } from '../types';

export async function getAllDoctors(): Promise<DoctorFromDB[] | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM doctor ' +
					'LEFT JOIN city ' +
					'ON doctor.city_id = city.city_id',
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

export async function getDoctorById(id: number): Promise<DoctorFromDB | null> {
	return new Promise(async (resolve, reject) => {
		(await database).transaction(tx => {
			tx.executeSql(
				'SELECT * FROM doctor ' +
					'LEFT JOIN city ' +
					'ON doctor.city_id = city.city_id ' +
					'WHERE doctor_id = (?)',
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
					'(doctor_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
					'doctor_name TEXT, ' +
					'doctor_fixed_phone TEXT, ' +
					'doctor_mobile_phone TEXT, ' +
					'doctor_email TEXT, ' +
					'doctor_specialty TEXT, ' +
					'doctor_crm TEXT, ' +
					'doctor_address TEXT, ' +
					'city_id INTEGER, ' +
					'FOREIGN KEY(city_id) REFERENCES city(city_id));'
			);
		});
	} catch (error) {
		return error;
	}
};

export async function createDoctor(doctor: DoctorCreate) {
	try {
		(await database).transaction(tx => {
			tx.executeSql(
				'INSERT INTO doctor (' +
					'doctor_name, ' +
					'doctor_fixed_phone, ' +
					'doctor_mobile_phone, ' +
					'doctor_email, ' +
					'doctor_specialty, ' +
					'doctor_crm, ' +
					'doctor_address, ' +
					'city_id' +
					') VALUES (?,?,?,?,?,?,?,?)',
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
				'UPDATE doctor SET ' +
					'doctor_name = (?), ' +
					'doctor_fixed_phone = (?), ' +
					'doctor_mobile_phone = (?), ' +
					'doctor_email = (?), ' +
					'doctor_specialty = (?), ' +
					'doctor_crm = (?), ' +
					'doctor_address = (?), ' +
					'city_id = (?) ' +
					'WHERE doctor_id = (?)',
				[
					doctor?.name || '',
					doctor?.fixedPhone || '',
					doctor?.mobilePhone || '',
					doctor?.email || '',
					doctor?.specialty || '',
					doctor?.crm || '',
					doctor?.address || '',
					doctor?.city?.id || '',
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
				'DELETE FROM doctor WHERE doctor_id = (?)',
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
