import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native';
import { Logo } from '../../../assets/icons';
import { CommonButton, CustomInput } from '../../../components';
import { deleteSecureStoreItem } from '../../../utils';

type TLogin = {
  styles: any;
  password: string;
  handleOnChange: (value: string) => void;
  handleSignIn: (password: string) => void;
  error: string;
  loading: boolean;
  goToRegister: () => void;
  hasPassword: boolean;
};

export function LoginView({
  password,
  handleOnChange,
  styles,
  handleSignIn,
  error,
  loading,
  goToRegister,
  hasPassword,
}: TLogin) {
  return (
    <View style={[styles?.container, { justifyContent: 'center' }]}>
      {loading && (<ActivityIndicator size="large" color="#0000ff" />)}
      {!loading && (
        <>
          <Logo />
          <Text style={styles.title}>Entre no <Text style={styles.titleBlue}>Aphiex</Text> e tenha acesso ao seu histórico de exames</Text>

          {hasPassword && (
            <>
              <View style={{ marginVertical: 30, width: '100%' }}>
                <CustomInput
                  placeholder='Senha'
                  value={password}
                  secureTextEntry
                  onChangeText={(value) => handleOnChange(value)}
                />
                <Text style={styles.error}>{error}</Text>
              </View>

              <View style={{ marginBottom: 20 }}>
                <CommonButton
                  title='Entrar'
                  onPress={() => handleSignIn(password)}
                />
              </View>

              <CommonButton
                title='Remover senha'
                onPress={() => {
                  deleteSecureStoreItem('Password');
                  deleteSecureStoreItem('SystemKey');
                  deleteSecureStoreItem('SystemIv');
                }}
              />
            </>
          )}
          {!hasPassword && (
            <>
              <Text style={styles.greyText}>Não tem perfil registrado?</Text>
              <CommonButton
                title='Criar Perfil'
                onPress={goToRegister}
              />
            </>
          )}
        </>
      )}
    </View>
  )
}
