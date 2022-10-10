import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
	MenuContainer,
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
	TestListContainer,
	TestCreateContainer,
	TestDetailContainer,
	TestEditContainer,
	TestTypeCreateContainer,
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

	TestList: undefined;
	TestCreate: undefined;
	TestDetail: { testId: number };
	TestEdit: { testId: number };

	TestTypeCreate: undefined;

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

			<Stack.Screen name="TestList" component={TestListContainer} />
			<Stack.Screen name="TestCreate" component={TestCreateContainer} />
			<Stack.Screen name="TestDetail" component={TestDetailContainer} />
			<Stack.Screen name="TestEdit" component={TestEditContainer} />

			<Stack.Screen name="TestTypeCreate" component={TestTypeCreateContainer} />

			<Stack.Screen name="Settings" component={SettingsContainer} />
		</Stack.Navigator>
	);
}
