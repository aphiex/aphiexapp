import CryptoES from 'crypto-es';
import {
	Image,
	ImageCreate,
	createImage,
	createImageTable,
	getImagesByTest,
	deleteImagesByTestId,
} from '../utils';

async function handleGetImagesByTest(
	testId: number,
	key: string
): Promise<Image[]> {
	return new Promise(async (resolve, reject) => {
		getImagesByTest(testId)
			.then(results => {
				if (results) {
					const images: Image[] = [];

					results.forEach(result => {
						images.push({
							id: result?.image_id,
							testId: result?.test_id,
							uri: result?.image_uri
								? CryptoES.AES.decrypt(result?.image_uri, key).toString(
										CryptoES.enc.Utf8
								  )
								: '',
						});
					});
					resolve(images);
				} else reject(new Error('Falha ao obter imagens'));
			})
			.catch(() => reject(new Error('Falha ao obter imagens')));
	});
}

async function handleCreateImage(
	image: ImageCreate,
	key: string
): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		createImageTable()
			.then(() => {
				const encryptedImage: ImageCreate = {
					testId: image?.testId,
					uri: image?.uri
						? CryptoES.AES.encrypt(image?.uri, key).toString()
						: '',
				};
				createImage(encryptedImage)
					.then(() => {
						resolve(true);
					})
					.catch(() => reject(new Error('Falha ao criar imagem')));
			})
			.catch(() => reject(new Error('Falha ao criar imagem')));
	});
}

async function handleDeleteImagesByTestId(testId: number): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		deleteImagesByTestId(testId)
			.then(() => resolve(true))
			.catch(() => reject(new Error('Falha ao deletar imagens')));
	});
}

export const imageService = {
	handleGetImagesByTest,
	handleCreateImage,
	handleDeleteImagesByTestId,
};
