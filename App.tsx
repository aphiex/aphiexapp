import { AuthProvider } from './src/context';
import { Router } from './src/routers';
import {
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import {
  Exo2_400Regular,
} from '@expo-google-fonts/exo-2';
import React from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Exo2_400Regular,
  })

  if (!fontsLoaded) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
