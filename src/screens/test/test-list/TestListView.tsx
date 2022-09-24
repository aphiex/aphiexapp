import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { HospitalBuilding } from '../../../assets/icons';
import { CustomButton, LoadingState, PageTitle } from '../../../components';
import { Place } from '../../../utils/Types';
import { styles } from './styles';

type TTestListView = {
	places: Place[] | undefined;
	loading: boolean;
	selectPlace: (id?: number) => void;
	goToCreatePlace: () => void;
};

export function TestListView({
	loading,
	places,
	selectPlace,
	goToCreatePlace,
}: TTestListView) {
	return (
		<View style={styles.container}>
			<PageTitle title="Locais" icon={<HospitalBuilding />} />

			{loading && <LoadingState />}

			{!loading && (!places || places?.length === 0) && (
				<View style={styles.button}>
					<CustomButton
						title="Cadastrar Local"
						onPress={() => goToCreatePlace()}
					/>
				</View>
			)}

			{!loading && places && places.length > 0 && (
				<View style={styles.listContainer}>
					{places.map(place => (
						<Pressable
							key={place?.id}
							style={styles.listItem}
							onPress={() => selectPlace(place?.id)}
						>
							<View style={styles.icon}>
								<Text style={styles.textIcon}>
									{place?.name?.charAt(0).toUpperCase() || '?'}
								</Text>
							</View>
							<View style={styles.textContainer}>
								<Text numberOfLines={1} style={styles.text}>
									{place?.name || ''}
								</Text>
							</View>
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
}
