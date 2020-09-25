//import liraries
import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

// create a component
export default function Card(props) {
 // render() {
    const { style } = props
    return <View style={[styles.card, style]}>{this.props.children}</View>
 // }
}

// define your styles
const styles = StyleSheet.create({
  card: {
    width: Layout.window.width - 20,
    paddingHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.headerLine,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0.3,
        },
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
})
