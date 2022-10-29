import CryptoES from 'crypto-es';
import {
	createTest,
	createTestTable,
	deleteTest,
	Test,
	getAllTests,
	getTestById,
	updateTest,
	TestCreate,
	TestEdit,
	getHistorialTests,
} from '../utils';

async function handleGetTests(
	key: string,
	profileId: number,
	ordination: 'DESC' | 'ASC'
): Promise<Test[]> {
	return new Promise(async (resolve, reject) => {
		getAllTests(profileId, ordination)
			.then(results => {
				if (results) {
					const decryptedData: Test[] = [];

					results.forEach(result => {
						decryptedData.push({
							id: result?.test_id,
							hasImage: result?.test_has_image || '',
							date: result?.test_date
								? CryptoES.AES.decrypt(result?.test_date, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							description: result?.test_description
								? CryptoES.AES.decrypt(result?.test_description, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							condition: result?.test_condition
								? CryptoES.AES.decrypt(result?.test_condition, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							value: result?.test_value
								? parseInt(
										CryptoES.AES.decrypt(result?.test_value, key).toString(
											CryptoES.enc.Utf8
										)
								  )
								: undefined,
							profileId: result?.profile_id,
							testType: {
								id: result?.test_type_id,
								measurementUnit: result?.test_type_measurement_unit,
								name: result?.test_type_name,
							},
						});
					});

					resolve(decryptedData);
				} else {
					reject(new Error('Falha ao obter exames'));
				}
			})
			.catch(error => {
				reject(new Error('Falha ao obter exames'));
			});
	});
}

async function handleGetHistoricalTests(
	testTypeId: number,
	key: string,
	profileId: number
): Promise<Test[]> {
	return new Promise(async (resolve, reject) => {
		getHistorialTests(testTypeId, profileId)
			.then(results => {
				if (results) {
					const decryptedData: Test[] = [];

					results.forEach(result => {
						decryptedData.push({
							id: result?.test_id,
							hasImage: result?.test_has_image || '',
							date: result?.test_date
								? CryptoES.AES.decrypt(result?.test_date, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							description: result?.test_description
								? CryptoES.AES.decrypt(result?.test_description, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							condition: result?.test_condition
								? CryptoES.AES.decrypt(result?.test_condition, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
							value: result?.test_value
								? parseInt(
										CryptoES.AES.decrypt(result?.test_value, key).toString(
											CryptoES.enc.Utf8
										)
								  )
								: undefined,
							profileId: result?.profile_id,
							testType: {
								id: result?.test_type_id,
								measurementUnit: result?.test_type_measurement_unit,
								name: result?.test_type_name,
							},
						});
					});

					resolve(decryptedData);
				} else {
					reject(new Error('Falha ao obter exames'));
				}
			})
			.catch(error => {
				reject(new Error('Falha ao obter exames'));
			});
	});
}

async function handleGetTestById(
	id: number,
	key: string,
	profileId: number
): Promise<Test> {
	return new Promise(async (resolve, reject) => {
		getTestById(id, profileId)
			.then(result => {
				if (result) {
					const decryptedData: Test = {
						id: result?.test_id,
						hasImage: result?.test_has_image || '',
						date: result?.test_date
							? CryptoES.AES.decrypt(result?.test_date, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						description: result?.test_description
							? CryptoES.AES.decrypt(result?.test_description, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						condition: result?.test_condition
							? CryptoES.AES.decrypt(result?.test_condition, key).toString(
									CryptoES.enc.Utf8
							  )
							: '',
						value: result?.test_value
							? Number(
									CryptoES.AES.decrypt(result?.test_value, key).toString(
										CryptoES.enc.Utf8
									)
							  )
							: undefined,
						profileId: result?.profile_id,
						testType: {
							id: result?.test_type_id,
							measurementUnit: result?.test_type_measurement_unit,
							name: result?.test_type_name,
						},
					};

					resolve(decryptedData);
				} else reject(new Error('Falha ao obter exame'));
			})
			.catch(() => reject(new Error('Falha ao obter exame')));
	});
}

async function handleCreateTest(
	test: TestCreate,
	key: string
): Promise<number> {
	return new Promise(async (resolve, reject) => {
		createTestTable()
			.then(() => {
				const encryptedTest: TestCreate = {
					hasImage: test?.hasImage || '',
					condition: test?.condition
						? CryptoES.AES.encrypt(test?.condition, key).toString()
						: '',
					description: test?.description
						? CryptoES.AES.encrypt(test?.description, key).toString()
						: '',
					date: test?.date
						? CryptoES.AES.encrypt(test?.date, key).toString()
						: '',
					value: test?.value
						? CryptoES.AES.encrypt(test?.value, key).toString()
						: '',
					profileId: test?.profileId,
					testTypeId: test?.testTypeId,
				};

				createTest(encryptedTest)
					.then(result => {
						resolve(result);
					})
					.catch(() => reject(new Error('Falha ao criar exame')));
			})
			.catch(() => reject(new Error('Falha ao criar exame')));
	});
}

async function handleUpdateTest(
	test: TestEdit,
	key: string
): Promise<TestEdit> {
	return new Promise(async (resolve, reject) => {
		const encryptedTest: TestEdit = {
			id: test?.id,
			hasImage: test?.hasImage || '',
			condition: test?.condition
				? CryptoES.AES.encrypt(test?.condition, key).toString()
				: '',
			description: test?.description
				? CryptoES.AES.encrypt(test?.description, key).toString()
				: '',
			date: test?.date ? CryptoES.AES.encrypt(test?.date, key).toString() : '',
			value: test?.value
				? CryptoES.AES.encrypt(test?.value, key).toString()
				: '',
			profileId: test?.profileId,
			testTypeId: test?.testTypeId,
		};

		updateTest(encryptedTest)
			.then(() => resolve(test))
			.catch(() => reject(new Error('Falha ao editar exame')));
	});
}

async function handleDeleteTest(testId: number): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteTest(testId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar exame')));
	});
}

export const testService = {
	handleGetTests,
	handleCreateTest,
	handleGetTestById,
	handleDeleteTest,
	handleUpdateTest,
	handleGetHistoricalTests,
};
