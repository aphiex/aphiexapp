import { City, CityFromDB } from '.';

export type Doctor = {
	id?: number;
	name?: string;
	fixedPhone?: string;
	mobilePhone?: string;
	email?: string;
	specialty?: string;
	crm?: string;
	address?: string;
	city?: City | null;
};

export type DoctorCreate = {
	name?: string;
	fixedPhone?: string;
	mobilePhone?: string;
	email?: string;
	specialty?: string;
	crm?: string;
	address?: string;
	cityId?: number;
};

export interface DoctorFromDB extends CityFromDB {
	doctor_id?: number;
	doctor_name?: string;
	doctor_fixed_phone?: string;
	doctor_mobile_phone?: string;
	doctor_email?: string;
	doctor_specialty?: string;
	doctor_crm?: string;
	doctor_address?: string;
}
