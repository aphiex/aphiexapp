import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProfileListContainer, ProfileCreateContainer } from '../screens';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null,
			}}
		>
			<Stack.Screen name="ProfileList" component={ProfileListContainer} />
			<Stack.Screen name="ProfileCreate" component={ProfileCreateContainer} />
		</Stack.Navigator>
	);
}
