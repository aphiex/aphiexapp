import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginContainer, RegisterContainer } from '../screens';

const Stack = createNativeStackNavigator();

export default function PublicStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null,
			}}
		>
			<Stack.Screen name="Login" component={LoginContainer} />
			<Stack.Screen name="Register" component={RegisterContainer} />
		</Stack.Navigator>
	);
}
