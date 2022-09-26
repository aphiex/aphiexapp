import {
	createTestType,
	createTestTypeTable,
	deleteTestType,
	TestType,
	getAllTestTypes,
	getTestTypeById,
	updateTestType,
	TestTypeCreate,
} from '../utils';

async function handleGetTestTypes(): Promise<TestType[]> {
	return new Promise(async (resolve, reject) => {
		getAllTestTypes()
			.then(results => {
				if (results) {
					const formatedTestTypes: TestType[] = [];

					results.forEach(result => {
						formatedTestTypes.push({
							id: result?.test_type_id,
							measurementUnit: result?.test_type_measurement_unit,
							name: result?.test_type_name,
						});
					});

					resolve(formatedTestTypes);
				} else {
					reject(new Error('Falha ao obter tipos de exames'));
				}
			})
			.catch(error => {
				reject(new Error('Falha ao obter tipos de exames'));
			});
	});
}

async function handleGetTestTypeById(id: number): Promise<TestType> {
	return new Promise(async (resolve, reject) => {
		getTestTypeById(id)
			.then(result => {
				if (result) {
					const formatedTestType: TestType = {
						id: result?.test_type_id,
						measurementUnit: result?.test_type_measurement_unit,
						name: result?.test_type_name,
					};

					resolve(formatedTestType);
				} else reject(new Error('Falha ao obter tipos de exame'));
			})
			.catch(() => reject(new Error('Falha ao obter tipos de exame')));
	});
}

async function handleCreateTestType(
	testType: TestTypeCreate
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createTestTypeTable()
			.then(() => {
				createTestType(testType)
					.then(() => {
						resolve(true);
					})
					.catch(() => reject(new Error('Falha ao criar novo tipo de exame')));
			})
			.catch(() => reject(new Error('Falha ao criar novo tipo de exame')));
	});
}

async function handleUpdateTestType(testType: TestType): Promise<TestType> {
	return new Promise(async (resolve, reject) => {
		updateTestType(testType)
			.then(() => resolve(testType))
			.catch(() => reject(new Error('Falha ao editar tipo de exame')));
	});
}

async function handleDeleteTestType(testTypeId: number): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteTestType(testTypeId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar tipo de exame')));
	});
}

export const testTypeService = {
	handleGetTestTypes,
	handleCreateTestType,
	handleGetTestTypeById,
	handleDeleteTestType,
	handleUpdateTestType,
};
