import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import theme from '../../styles/theme'

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderColor: `${theme.colors.grey}`,
    fontFamily: `${theme.fonts.regular400}`,
    fontSize: 14,
    paddingHorizontal: 8,
    color: `${theme.colors.softBlack}`,
    borderWidth: 1,
    width: '100%',
    height: 50,
  },
})

export function CustomInput(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={theme.colors.grey}
      style={styles.input}
      {...props} />
  )
}
