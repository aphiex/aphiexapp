import { TestType, TestTypeFromDB } from '.';

export type Test = {
	id?: number;
	value?: number;
	date?: string;
	description?: string;
	image?: string;
	profileId?: number;
	testType?: TestType | null;
};

export type TestCreate = {
	value?: number;
	date?: string;
	description?: string;
	image?: string;
	profileId?: number;
	testTypeId?: number;
};

export interface TestFromDB extends TestTypeFromDB {
	test_id?: number;
	test_value?: number;
	test_date?: string;
	test_description?: string;
	test_image?: string;
	profile_id?: number;
	test_type_id?: number;
}
