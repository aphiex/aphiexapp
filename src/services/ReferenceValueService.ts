import {
	createReferenceValue,
	createReferenceValueTable,
	deleteReferenceValue,
	ReferenceValue,
	getAllReferenceValues,
	getReferenceValueById,
	updateReferenceValue,
	ReferenceValueCreate,
	getReferenceValueByTestType,
	getReferenceConditionsByTestType,
	deleteReferenceValueByTestTypeId,
} from '../utils';

async function handleGetReferenceValues(): Promise<ReferenceValue[]> {
	return new Promise(async (resolve, reject) => {
		getAllReferenceValues()
			.then(results => {
				if (results) {
					const referenceValues: ReferenceValue[] = [];

					results.forEach(result => {
						referenceValues.push({
							id: result?.reference_value_id,
							gender: result?.reference_value_gender || '',
							maxAge: result?.reference_value_max_age || undefined,
							maxValue: result?.reference_value_max_value || undefined,
							minAge: result?.reference_value_min_age || undefined,
							minValue: result?.reference_value_min_value || undefined,
							condition: result?.reference_value_condition || '',
							testType: {
								id: result?.test_type_id || undefined,
								measurementUnit: result?.test_type_measurement_unit || '',
								name: result?.test_type_name || '',
							},
						});
					});

					resolve(referenceValues);
				} else {
					reject(new Error('Falha ao obter valores de referência'));
				}
			})
			.catch(error => {
				reject(new Error('Falha ao obter valores de referência'));
			});
	});
}

async function handleGetReferenceValueById(
	id: number
): Promise<ReferenceValue> {
	return new Promise(async (resolve, reject) => {
		getReferenceValueById(id)
			.then(result => {
				if (result) {
					const referenceValue: ReferenceValue = {
						id: result?.reference_value_id,
						gender: result?.reference_value_gender || '',
						maxAge: result?.reference_value_max_age || undefined,
						maxValue: result?.reference_value_max_value || undefined,
						minAge: result?.reference_value_min_age || undefined,
						minValue: result?.reference_value_min_value || undefined,
						condition: result?.reference_value_condition || '',
						testType: {
							id: result?.test_type_id || undefined,
							measurementUnit: result?.test_type_measurement_unit || '',
							name: result?.test_type_name || '',
						},
					};

					resolve(referenceValue);
				} else reject(new Error('Falha ao obter valor de referência'));
			})
			.catch(() => reject(new Error('Falha ao obter valor de referência')));
	});
}

async function handleGetReferenceValueByTestType(
	testTypeId: number
): Promise<ReferenceValue[]> {
	return new Promise(async (resolve, reject) => {
		getReferenceValueByTestType(testTypeId)
			.then(results => {
				if (results) {
					const referenceValues: ReferenceValue[] = [];

					results.forEach(result => {
						referenceValues.push({
							id: result?.reference_value_id,
							gender: result?.reference_value_gender || '',
							maxAge: result?.reference_value_max_age || undefined,
							maxValue: result?.reference_value_max_value || undefined,
							minAge: result?.reference_value_min_age || undefined,
							minValue: result?.reference_value_min_value || undefined,
							condition: result?.reference_value_condition || '',
							testType: undefined,
						});
					});

					resolve(referenceValues);
				} else reject(new Error('Falha ao obter valores de referência'));
			})
			.catch(() => reject(new Error('Falha ao obter valores de referência')));
	});
}

async function handleGetReferenceConditionsByTestType(
	testTypeId: number
): Promise<ReferenceValue[]> {
	return new Promise(async (resolve, reject) => {
		getReferenceConditionsByTestType(testTypeId)
			.then(results => {
				if (results && results.length > 0) {
					const referenceValues: ReferenceValue[] = [];

					results.forEach(result => {
						referenceValues.push({
							id: result?.reference_value_id,
							gender: result?.reference_value_gender || '',
							maxAge: result?.reference_value_max_age || undefined,
							maxValue: result?.reference_value_max_value || undefined,
							minAge: result?.reference_value_min_age || undefined,
							minValue: result?.reference_value_min_value || undefined,
							condition: result?.reference_value_condition || '',
							testType: undefined,
						});
					});

					resolve(referenceValues);
				} else
					reject(new Error('Não há condições cadastradas para este exame'));
			})
			.catch(() => reject(new Error('Falha ao obter condições')));
	});
}

async function handleCreateReferenceValue(
	referenceValue: ReferenceValueCreate
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createReferenceValueTable()
			.then(() => {
				createReferenceValue(referenceValue)
					.then(() => {
						resolve(true);
					})
					.catch(() => reject(new Error('Falha ao criar valor de referência')));
			})
			.catch(() => reject(new Error('Falha ao criar valor de referência')));
	});
}

async function handleUpdateReferenceValue(
	referenceValue: ReferenceValue
): Promise<ReferenceValue> {
	return new Promise(async (resolve, reject) => {
		updateReferenceValue(referenceValue)
			.then(() => resolve(referenceValue))
			.catch(() => reject(new Error('Falha ao editar valor de referência')));
	});
}

async function handleDeleteReferenceValue(
	referenceValueId: number
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteReferenceValue(referenceValueId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar valor de referência')));
	});
}

async function handleDeleteReferenceValueByTestTypeId(
	testTypeId: number
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteReferenceValueByTestTypeId(testTypeId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar valores de referência')));
	});
}

export const referenceValueService = {
	handleGetReferenceValues,
	handleCreateReferenceValue,
	handleGetReferenceValueById,
	handleDeleteReferenceValue,
	handleUpdateReferenceValue,
	handleGetReferenceValueByTestType,
	handleGetReferenceConditionsByTestType,
	handleDeleteReferenceValueByTestTypeId,
};
