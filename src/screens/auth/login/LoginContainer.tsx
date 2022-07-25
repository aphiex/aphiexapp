import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAuth } from '../../../context';
import theme from '../../../styles/theme';
import { getSecureStoreItem } from '../../../utils';
import { LoginView } from './LoginView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 23,
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.black}`,
    textAlign: 'center',
    marginVertical: 30,
  },
  titleBlue: {
    fontSize: 23,
    fontFamily: `${theme.fonts.exoRegular400}`,
    color: `${theme.colors.primary}`,
  },
  greyText: {
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.grey}`,
    fontSize: 23,
    marginBottom: 30,
    marginTop: 30,
  },
  error: {
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.red}`,
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 4,
  },
});

export function LoginContainer({ navigation }: NativeStackScreenProps<any, any>) {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [hasPassword, setHasPassword] = useState<boolean>(true);
  const { signIn } = useAuth();

  const checkStoragePassword = async () => {
    setLoading(true);
    const passwordStored = await getSecureStoreItem('Password');
    if (passwordStored) setHasPassword(true);
    else setHasPassword(false)
    setLoading(false);
  }
  
  const goToRegister = () => {
    navigation.navigate('Register');
  }

  const handleSignIn = async (password: string) => {
    if (password) {
      await signIn(password, setError);
    } else setError('Informe uma senha');
  }

  const handleOnChange = (value: string) => {
    setPassword(value);
    if (error) setError('');
  }

  useEffect(() => {
    checkStoragePassword();
  }, []);

  return (
    <LoginView
      password={password}
      handleOnChange={handleOnChange}
      styles={styles}
      handleSignIn={handleSignIn}
      error={error}
      loading={loading}
      goToRegister={goToRegister}
      hasPassword={hasPassword}
    />
  );
}
