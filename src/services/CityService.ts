import { City } from '../utils';
import { getCitiesByState, getCityById } from '../utils/City';

async function handleGetCitiesByState(state: string): Promise<City[]> {
	return new Promise(async (resolve, reject) => {
		getCitiesByState(state)
			.then(result => {
				if (result) {
					resolve(result);
				} else reject(new Error('Falha ao obter cidades'));
			})
			.catch(() => reject(new Error('Falha ao obter cidades')));
	});
}

async function handleGetCityById(id: number): Promise<City> {
	return new Promise(async (resolve, reject) => {
		getCityById(id)
			.then(result => {
				if (result) {
					resolve(result);
				} else reject(new Error('Falha ao obter cidade'));
			})
			.catch(() => reject(new Error('Falha ao obter cidade')));
	});
}

export const cityService = {
	handleGetCitiesByState,
	handleGetCityById,
};
