import React from 'react'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, Text } from 'react-native'
import theme from '../../styles/theme';

interface CommonButtonProps extends TouchableOpacityProps {
  title: string;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: `${theme.fonts.medium500}`,
    color: `${theme.colors.white}`,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: `${theme.colors.primary}`,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 120,
  },
})

export function CommonButton({ title, style, ...rest }: CommonButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
