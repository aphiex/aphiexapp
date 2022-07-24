import React from 'react'
import { View, Text, Pressable } from 'react-native';

type TRegister = {
  styles: any;
  onPressHandler: () => void;
};

export function RegisterView({ onPressHandler, styles }: TRegister) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Create Password</Text>
    <View style={styles.separator} />
    <Pressable
    onPress={onPressHandler}
    >
      <Text style={styles.title}>Go to login</Text>
    </Pressable>
  </View>
  )
}
