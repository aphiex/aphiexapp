import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import theme from '../../styles/theme';

type TPageTitle = {
  title: string;
  icon?: JSX.Element;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: `${theme.fonts.regular400}`,
    color: `${theme.colors.black}`,
    fontSize: 30,
  },
});

export function PageTitle({ icon, title }: TPageTitle) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
