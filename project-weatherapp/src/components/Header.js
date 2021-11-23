import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Sora',
    fontSize: 25,
    color: '#45dae0',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})
