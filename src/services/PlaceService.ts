import CryptoES from 'crypto-es';
import {
	createPlace,
	createPlaceTable,
	deletePlace,
	Place,
	getAllPlaces,
	getPlaceById,
	updatePlace,
} from '../utils';

async function handleGetPlaces(key: string): Promise<Place[]> {
	return new Promise(async (resolve, reject) => {
		getAllPlaces()
			.then(results => {
				if (results) {
					const decryptedData: Place[] = [];

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
							cityId: result?.city_id,
						});
					});

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter locais'));
			})
			.catch(() => reject(new Error('Falha ao obter locais')));
	});
}

async function handleGetPlaceById(key: string, id: number): Promise<Place> {
	return new Promise(async (resolve, reject) => {
		getPlaceById(id)
			.then(result => {
				if (result) {
					const decryptedData: Place = {
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
						cityId: result?.city_id,
					};

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter local'));
			})
			.catch(() => reject(new Error('Falha ao obter local')));
	});
}

async function handleCreatePlace(place: Place, key: string): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createPlaceTable()
			.then(() => {
				const encryptedPlace: Place = {
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
					.then(() => resolve(true))
					.catch(() => reject(new Error('Falha ao criar local')));
			})
			.catch(() => reject(new Error('Falha ao criar local')));
	});
}

async function handleUpdatePlace(place: Place, key: string): Promise<Place> {
	return new Promise(async (resolve, reject) => {
		const encryptedPlace: Place = {
			id: place?.id,
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
