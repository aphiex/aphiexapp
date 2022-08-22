import { AuthProvider, ProfileProvider } from './src/context';
import { Router } from './src/routers';
import { Roboto_500Medium, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Exo2_400Regular } from '@expo-google-fonts/exo-2';
import React from 'react';
import { useFonts } from 'expo-font';
import { LoadingState } from './src/components';
import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.setListMode('SCROLLVIEW');

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_500Medium,
		Roboto_400Regular,
		Exo2_400Regular,
	});

	if (!fontsLoaded) {
		return <LoadingState />;
	}

	return (
		<AuthProvider>
			<ProfileProvider>
				<Router />
			</ProfileProvider>
		</AuthProvider>
	);
}
