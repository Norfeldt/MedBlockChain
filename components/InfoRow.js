//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

// create a component
const InfoRow = ({ setting, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{setting}</Text>

      <Text style={styles.rightText}>{value}</Text>
    </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftText: {
    flex: 1,
    fontFamily: 'Aldrich-Regular',
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  rightText: {
    flex: 1,
    fontFamily: 'Aldrich-Regular',
    textAlign: 'right',
    color: Colors.passiveText,
  },
})

//make this component available to the app
export default InfoRow
