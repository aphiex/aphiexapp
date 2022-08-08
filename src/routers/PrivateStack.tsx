import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import {
  MenuContainer,
  ProfileContainer,
  ExamContainer,
  PlaceContainer,
  DoctorContainer,
  SettingsContainer
} from '../screens';

const Stack = createNativeStackNavigator();

export default function PrivateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
    >
      <Stack.Screen name='Menu' component={MenuContainer} />
      <Stack.Screen name='Profile' component={ProfileContainer} />
      <Stack.Screen name='Exam' component={ExamContainer} />
      <Stack.Screen name='Place' component={PlaceContainer} />
      <Stack.Screen name='Doctor' component={DoctorContainer} />
      <Stack.Screen name='Settings' component={SettingsContainer} />
    </Stack.Navigator>
  )
}
