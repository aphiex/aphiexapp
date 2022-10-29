import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
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
	saveCameraImage,
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
			if (!result?.cancelled) {
				let uri = result?.uri;
				if (saveCameraImage && !usePhotoFromLibrary)
					uri = (await MediaLibrary?.createAssetAsync(uri))?.uri;
				if (onTakePhoto) onTakePhoto(uri);
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
