import { TestType, TestTypeFromDB } from '.';

export type ReferenceValue = {
	id?: number;
	gender?: string;
	minValue?: number;
	maxValue?: number;
	minAge?: number;
	maxAge?: number;
	condition?: string;
	testType?: TestType | null;
};

export type ReferenceValueCreate = {
	gender?: string;
	minValue?: string;
	maxValue?: string;
	minAge?: number;
	maxAge?: number;
	condition?: string;
	testTypeId?: number;
};

export interface ReferenceValueFromDB extends TestTypeFromDB {
	reference_value_id?: number;
	reference_value_gender?: string;
	reference_value_min_value?: number;
	reference_value_max_value?: number;
	reference_value_min_age?: number;
	reference_value_max_age?: number;
	reference_value_condition?: string;
}
