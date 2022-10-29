import { TestType, TestTypeFromDB } from '.';

export type Test = {
	id?: number;
	value?: number;
	date?: string;
	description?: string;
	condition?: string;
	profileId?: number;
	testType?: TestType | null;
	hasImage?: string;
};

export type TestCreate = {
	value?: string;
	date?: string;
	description?: string;
	condition?: string;
	profileId?: number;
	testTypeId?: number;
	hasImage?: string;
};

export type TestEdit = {
	id?: number;
	value?: string;
	date?: string;
	description?: string;
	condition?: string;
	profileId?: number;
	testTypeId?: number;
	hasImage?: string;
};

export interface TestFromDB extends TestTypeFromDB {
	test_id?: number;
	test_value?: string;
	test_date?: string;
	test_description?: string;
	test_condition?: string;
	test_has_image?: string;
	profile_id?: number;
	test_type_id?: number;
}
