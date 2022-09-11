export type Profile = {
	id?: number;
	name?: string;
	description?: string;
	gender?: string;
	birthdate?: string;
};

export type ProfileFromDB = {
	profile_id?: number;
	profile_name?: string;
	profile_description?: string;
	profile_gender?: string;
	profile_birthdate?: string;
};
