import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
	MenuContainer,
	ProfileListContainer,
	ProfileCreateContainer,
	ExamContainer,
	PlaceContainer,
	DoctorContainer,
	SettingsContainer,
	ProfileEditContainer,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function PrivateStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null,
			}}
		>
			<Stack.Screen name="ProfileList" component={ProfileListContainer} />
			<Stack.Screen name="ProfileCreate" component={ProfileCreateContainer} />
			<Stack.Screen
				name="ProfileEdit"
				component={ProfileEditContainer}
				initialParams={{ profileId: 0 }}
			/>
			<Stack.Screen name="Menu" component={MenuContainer} />
			<Stack.Screen name="Exam" component={ExamContainer} />
			<Stack.Screen name="Place" component={PlaceContainer} />
			<Stack.Screen name="Doctor" component={DoctorContainer} />
			<Stack.Screen name="Settings" component={SettingsContainer} />
		</Stack.Navigator>
	);
}
