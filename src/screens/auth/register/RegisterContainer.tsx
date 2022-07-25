import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { authService } from '../../../services';
import theme from '../../../styles/theme';
import { RegisterView } from './RegisterView';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingTop: 40,
  },
  title: {
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.black}`,
    fontSize: 30,
  },
  text: {
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.black}`,
    fontSize: 15,
    textAlign: 'left',
  },
  textContainer: {
    marginTop: 26,
    marginBottom: 40,
    paddingHorizontal: 12,
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

export function RegisterContainer({ navigation }: NativeStackScreenProps<any, any>) {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChangePassword = (value: string) => {
    setPassword(value);
    if (error) setError('');
  }

  const handleChangePasswordConfirm = (value: string) => {
    setPasswordConfirm(value);
    if (error) setError('');
  }

  const handleSavePassword = async () => {
    if (password.length < 4) setError('Sua senha deve possuir ao menos 4 caracteres');
    else if (password === passwordConfirm) {

      try {

        const passwordFromService = await authService.savePassword(password);
        if (passwordFromService) navigation.replace('Login');

      } catch (error: any) {

        setError(error.message)
        Alert.alert(error.message, 'Tente novamente')

      }

    } else setError('As senhas informadas não são iguais');
  }

  return (
      <RegisterView
        password={password}
        passwordConfirm={passwordConfirm}
        styles={styles}
        handleChangePassword={handleChangePassword}
        handleChangePasswordConfirm={handleChangePasswordConfirm}
        error={error}
        handleSavePassword={handleSavePassword}
      />
  );
}

