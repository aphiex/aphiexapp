import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native'
import theme from '../../styles/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: `${theme.colors.white}`,
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
})

export const ScreenContainer: React.FC = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
