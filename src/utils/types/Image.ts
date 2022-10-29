export type Image = {
	id?: number;
	uri?: string;
	testId?: number;
};

export type ImageCreate = {
	uri?: string;
	testId?: number;
};

export type ImageFromDB = {
	image_id?: number;
	image_uri?: string;
	test_id?: number;
};
