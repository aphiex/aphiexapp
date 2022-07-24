import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { getCitiesFromDatabase, openDatabase } from '../../../utils/Database';
import CryptoES from 'crypto-es';
import { deleteSecureStoreItem } from '../../../utils/SecureStore';
import { checkSystemIv, checkSystemKey } from '../../../utils/Auth';
import { LoginView } from './LoginView';

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

const db = openDatabase();

export function LoginContainer({ navigation }: NativeStackScreenProps<any, any>) {

  const [password, setPassword] = useState<string>('SuperSenha');
  const [secureStore, setSecureStore] = useState<string>();
  const [key, setKey] = useState<CryptoES.lib.WordArray>();
  const [iv, setIv] = useState<CryptoES.lib.WordArray>();

  async function handleSetKeyAndIv() {
    const systemKey = await checkSystemKey();
    const systemIv = await checkSystemIv();
    setKey(CryptoES.enc.Base64.parse(systemKey))
    setIv(CryptoES.enc.Base64.parse(systemIv))
  }

  async function resetSecureStore() {
    deleteSecureStoreItem('Password');
    deleteSecureStoreItem('SystemKey');
    deleteSecureStoreItem('SystemIv');
  }

  const onPressHandler = () => {
    navigation.navigate('CreatePassword');
    // navigation.replace('CreatePassword'); Cria um novo stack de telas e apaga a anterior. Usar sempre que mudar de contexto
  }

  async function encryptData(value: string) {
    setPassword(CryptoES.AES.encrypt(value, key, { iv: iv }).toString())
    alert('Encripografou');
  }

  async function decryptData(value: string) {
    setPassword(CryptoES.AES.decrypt(value, key, { iv: iv }).toString(CryptoES.enc.Utf8))
    alert('Desencripografou');

  }

  useEffect(() => {
    // if (db)
    //   getCitiesFromDatabase(db, 'RO');
    handleSetKeyAndIv();
  }, []);

  return (
    <LoginView
      decryptData={decryptData}
      encryptData={encryptData}
      onPressHandler={onPressHandler}
      password={password}
      resetSecureStore={resetSecureStore}
      secureStore={secureStore}
      setSecureStore={setSecureStore}
      styles={styles}
    />
  );
}
