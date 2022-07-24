import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import {RegisterView} from './RegisterView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export function RegisterContainer({ navigation }: NativeStackScreenProps<any, any>) {
  const onPressHandler = () => {
    navigation.goBack();
  }

  return (
    <RegisterView
    onPressHandler={onPressHandler}
    styles={styles}
    />
  );
}

