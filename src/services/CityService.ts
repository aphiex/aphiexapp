import { City } from '../utils';
import { getCitiesByState, getCityById } from '../utils';

async function handleGetCitiesByState(state: string): Promise<City[]> {
	return new Promise(async (resolve, reject) => {
		getCitiesByState(state)
			.then(results => {
				if (results) {
					const cities: City[] = [];

					results.forEach(result => {
						cities.push({
							id: result.city_id,
							name: result.city_name,
							state: result.city_state,
						});
					});

					resolve(cities);
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
					const city: City = {
						id: result.city_id,
						name: result.city_name,
						state: result.city_state,
					};
					resolve(city);
				} else reject(new Error('Falha ao obter cidade'));
			})
			.catch(() => reject(new Error('Falha ao obter cidade')));
	});
}

export const cityService = {
	handleGetCitiesByState,
	handleGetCityById,
};
