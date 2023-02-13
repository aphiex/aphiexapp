import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const referenceWidth = 411.42857142857144;

export function proportionalResize(baseSize: number) {
	const newSize = baseSize * (width / referenceWidth);
	return newSize;
}
