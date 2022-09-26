import { TestType, TestTypeFromDB } from '.';

export type Test = {
	id?: number;
	value?: number;
	date?: string;
	description?: string;
	image?: string;
	condition?: string;
	profileId?: number;
	testType?: TestType | null;
};

export type TestCreate = {
	value?: string;
	date?: string;
	description?: string;
	image?: string;
	condition?: string;
	profileId?: number;
	testTypeId?: number;
};

export type TestEdit = {
	id?: number;
	value?: string;
	date?: string;
	description?: string;
	image?: string;
	condition?: string;
	profileId?: number;
	testTypeId?: number;
};

export interface TestFromDB extends TestTypeFromDB {
	test_id?: number;
	test_value?: string;
	test_date?: string;
	test_description?: string;
	test_image?: string;
	test_condition?: string;
	profile_id?: number;
	test_type_id?: number;
}
