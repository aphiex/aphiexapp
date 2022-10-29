import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TrashCan } from '../../assets/icons';
import theme from '../../styles/theme';
import ImageView from 'react-native-image-viewing';

import { styles } from './styles';

type TImageViewer = {
	index: number;
	images: string[];
	currentImage: string;
	deletable?: boolean;
	onRemoveImage?: (index: number) => void;
};

export function ImageViewer({
	currentImage,
	images,
	index,
	onRemoveImage,
	deletable,
}: TImageViewer) {
	const [visible, setIsVisible] = useState(false);

	return (
		<View key={index} style={styles.imageItem}>
			{deletable && (
				<View
					style={{
						position: 'absolute',
						right: 0,
						top: 0,
						paddingHorizontal: 4,
						paddingTop: 4,
						zIndex: 100,
					}}
				>
					<TouchableOpacity
						style={styles.deleteButton}
						onPress={() => {
							if (onRemoveImage) onRemoveImage(index);
						}}
					>
						<TrashCan size={24} color={theme.colors.softRed} />
					</TouchableOpacity>
				</View>
			)}

			<TouchableOpacity onPress={() => setIsVisible(true)}>
				<Image style={styles.image} source={{ uri: currentImage }} />
			</TouchableOpacity>
			<ImageView
				images={images?.map(image => {
					return { uri: image };
				})}
				imageIndex={index}
				visible={visible}
				onRequestClose={() => setIsVisible(false)}
			/>
		</View>
	);
}
