import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
	MenuContainer,
	ExamContainer,
	SettingsContainer,
	ProfileEditContainer,
	ProfileDetailContainer,
	DoctorListContainer,
	DoctorCreateContainer,
	DoctorDetailContainer,
	DoctorEditContainer,
	PlaceListContainer,
	PlaceCreateContainer,
	PlaceDetailContainer,
	PlaceEditContainer,
} from '../screens';

export type RootStackParamList = {
	Menu: undefined;

	ProfileEdit: undefined;
	ProfileDetail: undefined;

	DoctorList: undefined;
	DoctorCreate: undefined;
	DoctorDetail: { doctorId: number };
	DoctorEdit: { doctorId: number };

	PlaceList: undefined;
	PlaceCreate: undefined;
	PlaceDetail: { placeId: number };
	PlaceEdit: { placeId: number };

	Exam: undefined;
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

			<Stack.Screen name="PlaceList" component={PlaceListContainer} />
			<Stack.Screen name="PlaceCreate" component={PlaceCreateContainer} />
			<Stack.Screen name="PlaceDetail" component={PlaceDetailContainer} />
			<Stack.Screen name="PlaceEdit" component={PlaceEditContainer} />

			<Stack.Screen name="Exam" component={ExamContainer} />
			<Stack.Screen name="Settings" component={SettingsContainer} />
		</Stack.Navigator>
	);
}
