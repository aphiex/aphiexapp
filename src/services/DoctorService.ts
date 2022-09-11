import CryptoES from 'crypto-es';
import {
	createDoctor,
	createDoctorTable,
	deleteDoctor,
	Doctor,
	DoctorCreate,
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
							id: result?.doctor_id,
							name: result?.doctor_name
								? CryptoES.AES.decrypt(result?.doctor_name, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							fixedPhone: result?.doctor_fixed_phone
								? CryptoES.AES.decrypt(
										result?.doctor_fixed_phone,
										key
								  ).toString(CryptoES.enc.Utf8)
								: '',
							mobilePhone: result?.doctor_mobile_phone
								? CryptoES.AES.decrypt(
										result?.doctor_mobile_phone,
										key
								  ).toString(CryptoES.enc.Utf8)
								: '',
							email: result?.doctor_email
								? CryptoES.AES.decrypt(result?.doctor_email, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							address: result?.doctor_address
								? CryptoES.AES.decrypt(result?.doctor_address, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							crm: result?.doctor_crm
								? CryptoES.AES.decrypt(result?.doctor_crm, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							specialty: result?.doctor_specialty
								? CryptoES.AES.decrypt(result?.doctor_specialty, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							city: {
								id: result?.city_id,
								name: result?.city_name,
								state: result.city_state,
							},
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
						id: result?.doctor_id,
						name: result?.doctor_name
							? CryptoES.AES.decrypt(result?.doctor_name, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						address: result?.doctor_address
							? CryptoES.AES.decrypt(result?.doctor_address, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						crm: result?.doctor_crm
							? CryptoES.AES.decrypt(result?.doctor_crm, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						email: result?.doctor_email
							? CryptoES.AES.decrypt(result?.doctor_email, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						fixedPhone: result?.doctor_fixed_phone
							? CryptoES.AES.decrypt(result?.doctor_fixed_phone, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						mobilePhone: result?.doctor_mobile_phone
							? CryptoES.AES.decrypt(result?.doctor_mobile_phone, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						specialty: result?.doctor_specialty
							? CryptoES.AES.decrypt(result?.doctor_specialty, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						city: {
							id: result?.city_id,
							name: result?.city_name,
							state: result.city_state,
						},
					};

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter médico'));
			})
			.catch(() => reject(new Error('Falha ao obter médico')));
	});
}

async function handleCreateDoctor(
	doctor: DoctorCreate,
	key: string
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createDoctorTable()
			.then(() => {
				const encryptedDoctor: DoctorCreate = {
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
			city: doctor.city,
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
