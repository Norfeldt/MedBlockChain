//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

// create a component
const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
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
    fontFamily: 'Aldrich-Regular',
    fontSize: 24,
    color: Colors.headerTextColor,
    marginBottom: 5,
  },
})

//make this component available to the app
export default Header
