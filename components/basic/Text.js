import React, { PureComponent } from 'react'
import { Text as RNText, StyleSheet } from 'react-native'

export default class Text extends PureComponent {
  render() {
    return (
      <RNText style={[textStyle[this.props.type], this.props.style]}>
        {this.props.children}
      </RNText>
    )
  }
}

const p = {
  fontFamily: 'Aldrich',
  fontSize: 16,
}

const textStyle = StyleSheet.create({
  h1: {
    ...p,
    fontSize: 28,
    textAlign: 'center',
    paddingVertical: 10,
  },
  h2: {
    ...p,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10,
  },
  h3: {
    ...p,
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  h4: {
    ...p,
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
  },
  p,
})
