import { useState } from 'react';
import { StyleSheet, TextInput, Text, TextInputProps } from 'react-native'
import theme from '../../styles/theme'

interface ICustomInput extends TextInputProps {
  error?: string;
  label?: string;
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    backgroundColor: `${theme.colors.white}`,
    fontFamily: `${theme.fonts.regular400}`,
    fontSize: 14,
    paddingHorizontal: 8,
    color: `${theme.colors.softBlack}`,
    borderWidth: 1,
    width: '100%',
    height: 50,
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
})

export function CustomInput({
  error,
  label,
  ...rest
}: ICustomInput) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

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

      <TextInput
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={theme.colors.grey}
        style={[
          styles.input, { borderColor: handleSetColor() }]}
      />

      <Text style={styles.error}>{error}</Text>
    </>
  )
}