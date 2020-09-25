//import liraries
import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Constants from 'expo-constants';

import Colors from '../../constants/Colors'

function Header(props) {
  //render() {
    const { title, style, textStyle } = props

    return (
      <View style={[styles.container, style]}>
        {Platform.OS === 'ios' && (
          <View style={{ height: Constants.statusBarHeight }} />
        )}
        <Text style={[styles.text, textStyle]}>{title.toUpperCase()}</Text>
      </View>
    )
 // }
}

// define your styles
const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'Aldrich_400Regular',
    fontSize: 28,
    color: Colors.dark,
    marginVertical: 2,
  },
})

//make this component available to the app
export default Header
