import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Menu } from '../screens/menu';

const Stack = createNativeStackNavigator();

export default function PrivateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
    >
      <Stack.Screen name='Menu' component={Menu} />
    </Stack.Navigator>
  )
}
