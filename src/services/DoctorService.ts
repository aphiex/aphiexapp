import CryptoES from 'crypto-es';
import {
	createDoctor,
	createDoctorTable,
	deleteDoctor,
	Doctor,
	getAllDoctors,
	getDoctorById,
	updateDoctor,
} from '../utils';

async function handleGetDoctors(key: string): Promise<Doctor[]> {
	return new Promise(async (resolve, reject) => {
		getAllDoctors()
			.then(results => {
				if (results) {
					const decryptedData: Doctor[] = [];

					results.forEach(result => {
						decryptedData.push({
							id: result?.id,
							name: result?.name
								? CryptoES.AES.decrypt(result?.name, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							fixedPhone: result?.fixed_phone
								? CryptoES.AES.decrypt(result?.fixed_phone, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							mobilePhone: result?.mobile_phone
								? CryptoES.AES.decrypt(result?.mobile_phone, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							email: result?.email
								? CryptoES.AES.decrypt(result?.email, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							address: result?.address
								? CryptoES.AES.decrypt(result?.address, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							crm: result?.crm
								? CryptoES.AES.decrypt(result?.crm, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							specialty: result?.specialty
								? CryptoES.AES.decrypt(result?.specialty, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							cityId: result?.city_id,
						});
					});

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter médicos'));
			})
			.catch(() => reject(new Error('Falha ao obter médicos')));
	});
}

async function handleGetDoctorById(key: string, id: number): Promise<Doctor> {
	return new Promise(async (resolve, reject) => {
		getDoctorById(id)
			.then(result => {
				if (result) {
					const decryptedData: Doctor = {
						id: result?.id,
						name: result?.name
							? CryptoES.AES.decrypt(result?.name, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						address: result?.address
							? CryptoES.AES.decrypt(result?.address, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						crm: result?.crm
							? CryptoES.AES.decrypt(result?.crm, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						email: result?.email
							? CryptoES.AES.decrypt(result?.email, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						fixedPhone: result?.fixed_phone
							? CryptoES.AES.decrypt(result?.fixed_phone, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						mobilePhone: result?.mobile_phone
							? CryptoES.AES.decrypt(result?.mobile_phone, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						specialty: result?.specialty
							? CryptoES.AES.decrypt(result?.specialty, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						cityId: result?.city_id,
					};

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter médico'));
			})
			.catch(() => reject(new Error('Falha ao obter médico')));
	});
}

async function handleCreateDoctor(
	doctor: Doctor,
	key: string
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createDoctorTable()
			.then(() => {
				const encryptedDoctor: Doctor = {
					cityId: doctor.cityId,
					name: doctor?.name
						? CryptoES.AES.encrypt(doctor?.name, key).toString()
						: '',
					address: doctor?.address
						? CryptoES.AES.encrypt(doctor?.address, key).toString()
						: '',
					crm: doctor?.crm
						? CryptoES.AES.encrypt(doctor?.crm, key).toString()
						: '',
					email: doctor?.email
						? CryptoES.AES.encrypt(doctor?.email, key).toString()
						: '',
					fixedPhone: doctor?.fixedPhone
						? CryptoES.AES.encrypt(doctor?.fixedPhone, key).toString()
						: '',
					mobilePhone: doctor?.mobilePhone
						? CryptoES.AES.encrypt(doctor?.mobilePhone, key).toString()
						: '',
					specialty: doctor?.specialty
						? CryptoES.AES.encrypt(doctor?.specialty, key).toString()
						: '',
				};

				createDoctor(encryptedDoctor)
					.then(() => resolve(true))
					.catch(() => reject(new Error('Falha ao criar médico')));
			})
			.catch(() => reject(new Error('Falha ao criar médico')));
	});
}

async function handleUpdateDoctor(
	doctor: Doctor,
	key: string
): Promise<Doctor> {
	return new Promise(async (resolve, reject) => {
		const encryptedDoctor: Doctor = {
			id: doctor?.id,
			cityId: doctor.cityId,
			name: doctor?.name
				? CryptoES.AES.encrypt(doctor?.name, key).toString()
				: '',
			address: doctor?.address
				? CryptoES.AES.encrypt(doctor?.address, key).toString()
				: '',
			crm: doctor?.crm ? CryptoES.AES.encrypt(doctor?.crm, key).toString() : '',
			email: doctor?.email
				? CryptoES.AES.encrypt(doctor?.email, key).toString()
				: '',
			fixedPhone: doctor?.fixedPhone
				? CryptoES.AES.encrypt(doctor?.fixedPhone, key).toString()
				: '',
			mobilePhone: doctor?.mobilePhone
				? CryptoES.AES.encrypt(doctor?.mobilePhone, key).toString()
				: '',
			specialty: doctor?.specialty
				? CryptoES.AES.encrypt(doctor?.specialty, key).toString()
				: '',
		};

		updateDoctor(encryptedDoctor)
			.then(() => resolve(doctor))
			.catch(() => reject(new Error('Falha ao editar médico')));
	});
}

async function handleDeleteDoctor(doctorId: number): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteDoctor(doctorId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar médico')));
	});
}

export const doctorService = {
	handleGetDoctors,
	handleCreateDoctor,
	handleGetDoctorById,
	handleDeleteDoctor,
	handleUpdateDoctor,
};
