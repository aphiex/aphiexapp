export function hasInvalidCharactersPassword(password: string) {
	const alphaNumeric = new RegExp('^[a-zA-Z0-9]*$');
	return !alphaNumeric.test(password);
}

export function hasInvalidLegthPassword(password: string) {
	const minLength = 4;
	return password.length < minLength;
}
