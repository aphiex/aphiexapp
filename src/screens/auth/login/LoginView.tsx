import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { getSecureStoreItem, setSecureStoreItem } from '../../../utils';

type TLogin = {
  styles: any;
  password: string;
  secureStore: string | undefined;
  onPressHandler: () => void;
  resetSecureStore(): Promise<void>;
  setSecureStore: React.Dispatch<React.SetStateAction<string | undefined>>;
  encryptData(value: string): Promise<void>;
  decryptData(value: string): Promise<void>;
};

export function LoginView({ onPressHandler, password, secureStore, decryptData, encryptData, resetSecureStore,setSecureStore,styles }: TLogin) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} />

      <Pressable onPress={onPressHandler}>

        <Text style={styles.title}>Go to Create Password</Text>
      </Pressable>

      <Pressable onPress={() => setSecureStoreItem('Password', password)}>
        <Text style={styles.title}>(Setar palavra secreta)</Text>
      </Pressable>

      <Pressable onPress={async () => {
        const password = await getSecureStoreItem('Password')
        if (password) setSecureStore(password)
        else alert('No values stored under that key.');
      }}
      >
        <Text style={styles.title}>(Pegar palavra secreta)</Text>
      </Pressable>

      <Pressable onPress={() => encryptData(password)}>
        <Text style={styles.title}>(Encriptar palavra secreta)</Text>
      </Pressable>

      <Pressable onPress={() => decryptData(password)}>
        <Text style={styles.title}>(Desencriptar palavra secreta)</Text>
      </Pressable>

      <Pressable onPress={resetSecureStore}>
        <Text style={styles.title}>(Resetar SecureStore)</Text>
      </Pressable>

      <Text style={styles.title}>{`PassWord: ${password}`}</Text>
      <Text style={styles.title}>{`PassWord do SecureStore: ${secureStore || ''}`}</Text>
    </View>
  )
}
