import React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export default function Text({ type, style, children }) {
  return <RNText style={[p, textStyle[type], style]}>{children}</RNText>
}

const p = {
  fontFamily: 'Aldrich_400Regular',
  fontSize: 16,
  textAlign: 'center',
}

const textStyle = StyleSheet.create({
  h1: {
    fontSize: 28,
    textAlign: 'center',
    paddingVertical: 10,
  },
  h2: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10,
  },
  h3: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  h4: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
  },
  p,
  passiveHeader: {
    fontFamily: 'NovaMono_400Regular',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.passive,
    paddingVertical: 5,
  },
  code: {
    fontFamily: 'NovaMono_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
})
