import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { ScreenContainer } from '../../../components';
import { useAuth } from '../../../context';
import { authService } from '../../../services';
import theme from '../../../styles/theme';
import {
  hasInvalidCharactersPassword,
  hasInvalidLegthPassword,
} from '../../../utils';
import { LoginView } from './LoginView';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
  container2: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export function LoginContainer({
  navigation,
}: NativeStackScreenProps<any, any>) {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [hasPassword, setHasPassword] = useState<boolean>(true);
  const { signIn } = useAuth();

  const checkStoragePassword = async () => {
    setLoading(true);
    authService
      .hasPassword()
      .then(result => {
        setHasPassword(result);
      })
      .catch(error => {
        setHasPassword(false);
      });
    setLoading(false);
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const handleSignIn = async (password: string) => {
    if (!password) setError('Informe uma senha');
    else if (
      hasInvalidLegthPassword(password) ||
      hasInvalidCharactersPassword(password)
    )
      setError('Senha inválida');
    else await signIn(password, setError);
  };

  const handleOnChange = (value: string) => {
    setPassword(value);
    if (error) setError('');
  };

  useEffect(() => {
    checkStoragePassword();
  }, []);

  return (
    <ScreenContainer>
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
    </ScreenContainer>
  );
}
