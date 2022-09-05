import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
	MenuContainer,
	ExamContainer,
	PlaceContainer,
	SettingsContainer,
	ProfileEditContainer,
	ProfileDetailContainer,
	DoctorListContainer,
	DoctorCreateContainer,
	DoctorDetailContainer,
	DoctorEditContainer,
} from '../screens';

export type RootStackParamList = {
	Menu: undefined;

	ProfileEdit: undefined;
	ProfileDetail: undefined;

	DoctorList: undefined;
	DoctorCreate: undefined;
	DoctorDetail: { doctorId: number };
	DoctorEdit: { doctorId: number };

	Exam: undefined;
	Place: undefined;
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

			<Stack.Screen name="ProfileDetail" component={ProfileDetailContainer} />
			<Stack.Screen name="ProfileEdit" component={ProfileEditContainer} />

			<Stack.Screen name="DoctorList" component={DoctorListContainer} />
			<Stack.Screen name="DoctorCreate" component={DoctorCreateContainer} />
			<Stack.Screen name="DoctorDetail" component={DoctorDetailContainer} />
			<Stack.Screen name="DoctorEdit" component={DoctorEditContainer} />

			<Stack.Screen name="Exam" component={ExamContainer} />
			<Stack.Screen name="Place" component={PlaceContainer} />
			<Stack.Screen name="Settings" component={SettingsContainer} />
		</Stack.Navigator>
	);
}
