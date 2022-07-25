import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { Lock } from '../../../assets/icons';
import { CommonButton, CustomInput } from '../../../components';
import { PageTitle } from '../../../components';

type TRegister = {
  styles: any;
  handleSavePassword: () => void;
  error: string;
  password: string;
  passwordConfirm: string;
  handleChangePassword: (value: string) => void;
  handleChangePasswordConfirm: (value: string) => void;
};

export function RegisterView({
  handleSavePassword,
  error,
  styles,
  password,
  passwordConfirm,
  handleChangePasswordConfirm,
  handleChangePassword,
}: TRegister) {
  return (
    <View style={styles.container}>
      <PageTitle
        icon={<Lock />}
        title='Definir senha'
      />

      <View style={styles.textContainer}>
        <Text style={[styles.text, { marginBottom: 15 }]}>
          Antes de criar seu primeiro perfil é necessário definir uma senha, dessa forma seus dados estarão mais seguros.
        </Text>
        <Text style={styles.text}>
          Não será possível recuperar sua senha, portanto lembre-se bem dela.
        </Text>
      </View>

      <View style={{ marginBottom: 26, width: '100%' }}>
        <CustomInput
          placeholder='Senha'
          value={password}
          secureTextEntry
          onChangeText={(value) => handleChangePassword(value)}
        />
      </View>

      <View style={{marginBottom: 50, width: '100%' }}>
        <CustomInput
          placeholder='Confirme sua senha'
          value={passwordConfirm}
          secureTextEntry
          onChangeText={(value) => handleChangePasswordConfirm(value)}
        />
        <Text style={styles.error}>{error}</Text>
      </View>

      <CommonButton
        title='Salvar senha'
        onPress={handleSavePassword}
      />
    </View>
  )
}
