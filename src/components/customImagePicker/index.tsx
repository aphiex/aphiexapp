import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from '../iconButton';
import { Camera, Image } from '../../assets/icons';

type TCustomImagePicker = {
	usePhotoFromLibrary?: boolean;
	saveCameraImage?: boolean;
	onTakePhoto?: (uri) => void;
	onCancelTakePhoto?: () => void;
};

export function CustomImagePicker({
	onCancelTakePhoto,
	onTakePhoto,
	usePhotoFromLibrary,
}: TCustomImagePicker) {
	function getPermission() {
		ImagePicker?.requestCameraPermissionsAsync();
		ImagePicker?.requestMediaLibraryPermissionsAsync();
	}

	const getImage = async () => {
		let result: any = undefined;
		if (usePhotoFromLibrary)
			result = await ImagePicker?.launchImageLibraryAsync();
		else result = await ImagePicker?.launchCameraAsync();
		if (result) {
			if (!result?.canceled) {
				if (onTakePhoto) onTakePhoto(result?.assets[0]?.uri);
				else if (onCancelTakePhoto) onCancelTakePhoto();
			}
		}
	};

	useEffect(() => {
		getPermission();
	}, []);

	return (
		<IconButton
			title={usePhotoFromLibrary ? 'Carregar foto' : 'Tirar foto'}
			icon={usePhotoFromLibrary ? <Image size={70} /> : <Camera size={70} />}
			onPress={getImage}
		/>
	);
}
