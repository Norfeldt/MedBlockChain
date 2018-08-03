//import liraries
import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default class Button extends PureComponent {
  render() {
    const {
      style,
      title,
      onPress,
      buttonColor,
      iconName,
      iconColor,
    } = this.props
    return (
      <TouchableOpacity
        style={[styles.btnClickContain, style]}
        onPress={onPress}
      >
        <View
          style={[
            styles.btnContainer,
            { backgroundColor: buttonColor ? buttonColor : Colors.tintColor },
          ]}
        >
          <Text style={styles.btnText}>{title}</Text>
          <Icon
            style={styles.btnIcon}
            name={iconName}
            size={40}
            color={iconColor ? iconColor : '#fff'}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

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
    alignSelf: 'center',
    textAlign: 'right',
  },
  btnText: {
    flex: 1,
    fontFamily: 'Aldrich-Regular',
    fontSize: 24,
    color: '#fff',
    paddingTop: 5,
  },
})
