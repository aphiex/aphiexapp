import { City, CityFromDB } from '.';

export type Place = {
	id?: number;
	name?: string;
	fixedPhone?: string;
	mobilePhone?: string;
	email?: string;
	address?: string;
	city?: City | null;
};

export type PlaceCreate = {
	name?: string;
	fixedPhone?: string;
	mobilePhone?: string;
	email?: string;
	address?: string;
	cityId?: number;
};

export interface PlaceFromDB extends CityFromDB {
	place_id?: number;
	place_name?: string;
	place_fixed_phone?: string;
	place_mobile_phone?: string;
	place_email?: string;
	place_address?: string;
	city_id?: number;
}
