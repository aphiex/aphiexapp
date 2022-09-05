export type Profile = {
	id?: number;
	name?: string;
	description?: string;
	gender?: string;
	birthdate?: string;
};

export type Doctor = {
	id?: number;
	name?: string;
	fixedPhone?: string;
	mobilePhone?: string;
	email?: string;
	specialty?: string;
	crm?: string;
	address?: string;
	cityId?: number;
};

export type DoctorFromBD = {
	id?: number;
	name?: string;
	fixed_phone?: string;
	mobile_phone?: string;
	email?: string;
	specialty?: string;
	crm?: string;
	address?: string;
	city_id?: number;
};

export type City = {
	id?: number;
	name?: string;
	state?: string;
};

export type SelectItem = { label: string; value: string };
