import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TextInputProps, View, TouchableOpacity } from 'react-native'
import { EyeOffOutline, EyeOutline } from '../../assets/icons';
import theme from '../../styles/theme'

interface IPasswordInput extends TextInputProps {
  error?: string;
  label?: string;
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  error: {
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.red}`,
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 5,
    marginTop: 4,
  },
  label: {
    fontFamily: `${theme.fonts.regular400}`,
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 5,
    marginBottom: 4,
  },
  passwordContainer: {
    borderRadius: 8,
    backgroundColor: `${theme.colors.white}`,
    fontFamily: `${theme.fonts.regular400}`,
    fontSize: 14,
    paddingHorizontal: 8,
    color: `${theme.colors.softBlack}`,
    borderWidth: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'transparent',
    marginLeft: 5,
    marginTop: 13,
  },
})

export function PasswordInput({
  error,
  label,
  ...rest
}: IPasswordInput) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  function handleSetColor() {
    if (error) return theme.colors.red;
    if (isFocused) return theme.colors.primary;
    return theme.colors.grey;
  }

  return (
    <>
      <Text style={[styles.label, { color: handleSetColor() }]}>
        {label}
      </Text>

      <View style={[
        styles.passwordContainer, 
        { borderColor: handleSetColor() },
        ]}>
        <TextInput
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          placeholderTextColor={theme.colors.grey}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={(e) => {
          e.preventDefault();
          setHidePassword(!hidePassword);
        }}>
          {hidePassword && (
            <EyeOffOutline
              color={isFocused ? theme.colors.primary : theme.colors.grey}
              size={20}
            />
          )}
          {!hidePassword && (
            <EyeOutline
              color={isFocused ? theme.colors.primary : theme.colors.grey}
              size={20}
            />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.error}>{error}</Text>
    </>
  )
}