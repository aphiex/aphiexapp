export type TestType = {
	id?: number;
	name?: string;
	measurementUnit?: string;
};

export type TestTypeCreate = {
	name?: string;
	measurementUnit?: string;
};

export type TestTypeFromDB = {
	test_type_id?: number;
	test_type_name?: string;
	test_type_measurement_unit?: string;
};
