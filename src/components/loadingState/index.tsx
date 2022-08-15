import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    marginTop: '50%',
  },
})

export function LoadingState() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  )
}
