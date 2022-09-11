import CryptoES from 'crypto-es';
import {
	createPlace,
	createPlaceTable,
	deletePlace,
	Place,
	getAllPlaces,
	getPlaceById,
	updatePlace,
	PlaceCreate,
} from '../utils';

async function handleGetPlaces(key: string): Promise<Place[]> {
	return new Promise(async (resolve, reject) => {
		getAllPlaces()
			.then(results => {
				if (results) {
					const decryptedData: Place[] = [];

					results.forEach(result => {
						decryptedData.push({
							id: result?.place_id,
							name: result?.place_name
								? CryptoES.AES.decrypt(result?.place_name, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							fixedPhone: result?.place_fixed_phone
								? CryptoES.AES.decrypt(result?.place_fixed_phone, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							mobilePhone: result?.place_mobile_phone
								? CryptoES.AES.decrypt(
										result?.place_mobile_phone,
										key
								  ).toString(CryptoES.enc.Utf8)
								: '',
							email: result?.place_email
								? CryptoES.AES.decrypt(result?.place_email, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							address: result?.place_address
								? CryptoES.AES.decrypt(result?.place_address, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							city: {
								id: result?.city_id,
								name: result.city_name,
								state: result.city_state,
							},
						});
					});

					resolve(decryptedData);
				} else {
					reject(new Error('Falha ao obter locais'));
				}
			})
			.catch(error => {
				reject(new Error('Falha ao obter locais'));
			});
	});
}

async function handleGetPlaceById(key: string, id: number): Promise<Place> {
	return new Promise(async (resolve, reject) => {
		getPlaceById(id)
			.then(result => {
				if (result) {
					const decryptedData: Place = {
						id: result?.place_id,
						name: result?.place_name
							? CryptoES.AES.decrypt(result?.place_name, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						address: result?.place_address
							? CryptoES.AES.decrypt(result?.place_address, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						email: result?.place_email
							? CryptoES.AES.decrypt(result?.place_email, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						fixedPhone: result?.place_fixed_phone
							? CryptoES.AES.decrypt(result?.place_fixed_phone, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						mobilePhone: result?.place_mobile_phone
							? CryptoES.AES.decrypt(result?.place_mobile_phone, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						city: {
							id: result?.city_id,
							name: result.city_name,
							state: result.city_state,
						},
					};

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter local'));
			})
			.catch(() => reject(new Error('Falha ao obter local')));
	});
}

async function handleCreatePlace(
	place: PlaceCreate,
	key: string
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createPlaceTable()
			.then(() => {
				const encryptedPlace: PlaceCreate = {
					cityId: place.cityId,
					name: place?.name
						? CryptoES.AES.encrypt(place?.name, key).toString()
						: '',
					address: place?.address
						? CryptoES.AES.encrypt(place?.address, key).toString()
						: '',
					email: place?.email
						? CryptoES.AES.encrypt(place?.email, key).toString()
						: '',
					fixedPhone: place?.fixedPhone
						? CryptoES.AES.encrypt(place?.fixedPhone, key).toString()
						: '',
					mobilePhone: place?.mobilePhone
						? CryptoES.AES.encrypt(place?.mobilePhone, key).toString()
						: '',
				};

				createPlace(encryptedPlace)
					.then(() => {
						resolve(true);
					})
					.catch(() => reject(new Error('Falha ao criar local')));
			})
			.catch(() => reject(new Error('Falha ao criar local')));
	});
}

async function handleUpdatePlace(place: Place, key: string): Promise<Place> {
	return new Promise(async (resolve, reject) => {
		const encryptedPlace: Place = {
			id: place?.id,
			city: place.city,
			name: place?.name
				? CryptoES.AES.encrypt(place?.name, key).toString()
				: '',
			address: place?.address
				? CryptoES.AES.encrypt(place?.address, key).toString()
				: '',
			email: place?.email
				? CryptoES.AES.encrypt(place?.email, key).toString()
				: '',
			fixedPhone: place?.fixedPhone
				? CryptoES.AES.encrypt(place?.fixedPhone, key).toString()
				: '',
			mobilePhone: place?.mobilePhone
				? CryptoES.AES.encrypt(place?.mobilePhone, key).toString()
				: '',
		};

		updatePlace(encryptedPlace)
			.then(() => resolve(place))
			.catch(() => reject(new Error('Falha ao editar local')));
	});
}

async function handleDeletePlace(placeId: number): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deletePlace(placeId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar local')));
	});
}

export const placeService = {
	handleGetPlaces,
	handleCreatePlace,
	handleGetPlaceById,
	handleDeletePlace,
	handleUpdatePlace,
};
