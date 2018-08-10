//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
    height: 55,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.headerColor,
    borderColor: Colors.headerLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontFamily: 'Aldrich',
    fontSize: 28,
    color: Colors.headerTextColor,
    marginBottom: 2,
  },
})

//make this component available to the app
export default Header
