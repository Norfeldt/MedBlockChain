//import liraries
import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'
import FontIcon from './FontIcon'

export default (Button = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.btnClickContain} onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>{title}</Text>
        <FontIcon
          name={iconName}
          size={40}
          color="#fff"
          style={styles.btnIcon}
        />
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  btnClickContain: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tintColor,
    borderRadius: 5,
    padding: 5,
    marginTop: 7,
    marginBottom: 7,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btnIcon: {
    flex: 1,
  },
  btnText: {
    flex: 1,
    fontFamily: 'Aldrich-Regular',
    fontSize: 24,
    color: '#fff',
    paddingTop: 5,
  },
})
