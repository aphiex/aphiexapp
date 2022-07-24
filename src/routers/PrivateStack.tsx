import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { RegisterContainer } from '../screens/auth';

const Stack = createNativeStackNavigator();

export default function PrivateStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      header: () => null
    }}
  >
    <Stack.Screen name='Register' component={RegisterContainer} />
  </Stack.Navigator>
  )
}
