//import liraries
import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'

import Colors from '../../constants/Colors'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'fonticons')

export default class Button extends PureComponent {
  render() {
    const {
      style,
      title,
      onPress,
      buttonColor,
      textColor,
      iconName,
    } = this.props
    return (
      <TouchableOpacity
        style={[
          styles.btnClickContain,
          { backgroundColor: buttonColor ? buttonColor : Colors.themeColor },
          style,
        ]}
        onPress={onPress}
      >
        <Text
          style={[styles.btnText, { color: textColor ? textColor : '#fff' }]}
        >
          {title}
        </Text>
        <Icon
          style={styles.btnIcon}
          name={iconName}
          size={40}
          color={textColor ? textColor : '#fff'}
        />
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
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 7,
    borderRadius: 5,
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
  btnIcon: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
  },
  btnText: {
    flex: 4,
    fontFamily: 'Aldrich',
    fontSize: 24,
    color: '#fff',
    paddingTop: 5,
  },
})
