//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import Colors from '../../constants/Colors'

// create a component
const Header = ({ style, title }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.panel,
    borderColor: Colors.panelOutline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
        },
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
  text: {
    fontFamily: 'Aldrich',
    fontSize: 28,
    color: Colors.dark,
    marginBottom: 2,
  },
})

//make this component available to the app
export default Header
