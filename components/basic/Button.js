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
            { backgroundColor: buttonColor ? buttonColor : Colors.themeColor },
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
    padding: 5,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
    borderColor: Colors.dark,
    borderWidth: StyleSheet.hairlineWidth,
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
    fontFamily: 'Aldrich',
    fontSize: 24,
    color: '#fff',
    paddingTop: 5,
  },
})
