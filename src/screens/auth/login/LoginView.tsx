import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native';
import { Logo } from '../../../assets/icons';
import { CustomButton, LoadingState, PasswordInput } from '../../../components';
import { deleteDatabase } from '../../../utils';

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
      {loading && (<LoadingState />)}
      {!loading && (
        <>
          <Logo />
          <Text style={styles.title}>
            Entre no {''}
            <Text style={styles.titleBlue}>Aphiex</Text>
            {''} e tenha acesso ao seu histórico de exames
          </Text>

          {hasPassword && (
            <>
              <View style={{ marginVertical: 30, width: '100%' }}>
                <PasswordInput
                  label='Senha*'
                  placeholder='Digite sua senha'
                  value={password}
                  error={error}
                  onChangeText={(value) => handleOnChange(value)}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <CustomButton
                  title='Entrar'
                  onPress={() => handleSignIn(password)}
                />
              </View>

              {/* <CustomButton
                title='Deletar Banco de Dados'
                onPress={() => {
                  deleteDatabase();
                }}
              /> */}
            </>
          )}
          {!hasPassword && (
            <>
              <Text style={styles.greyText}>Não tem perfil registrado?</Text>
              <CustomButton
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
