import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
	MenuContainer,
	ExamContainer,
	PlaceContainer,
	DoctorContainer,
	SettingsContainer,
	ProfileEditContainer,
	ProfileDetailContainer,
} from '../screens';

export type RootStackParamList = {
	ProfileEdit: undefined;
	ProfileDetail: undefined;
	Menu: undefined;
	Exam: undefined;
	Place: undefined;
	Doctor: undefined;
	Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PrivateStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null,
			}}
		>
			<Stack.Screen name="Menu" component={MenuContainer} />
			<Stack.Screen
				name="ProfileDetail"
				component={ProfileDetailContainer}
				initialParams={{ profileId: 0 }}
			/>
			<Stack.Screen
				name="ProfileEdit"
				component={ProfileEditContainer}
				initialParams={{ profileId: 0 }}
			/>
			<Stack.Screen name="Exam" component={ExamContainer} />
			<Stack.Screen name="Place" component={PlaceContainer} />
			<Stack.Screen name="Doctor" component={DoctorContainer} />
			<Stack.Screen name="Settings" component={SettingsContainer} />
		</Stack.Navigator>
	);
}
