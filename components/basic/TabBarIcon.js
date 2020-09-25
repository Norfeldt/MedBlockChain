import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import Text from './Text'
import Colors from '../../constants/Colors'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'fonticons')

export default function TabBarIcon(props) {
 // render() {
    const { name, focused, style, counter } = props
    return (
      <View>
        <Icon
          style={[{ marginBottom: -3 }, style]}
          name={name}
          size={26}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
        {counter > 0 && (
          <View
            style={[
              blockStyles.badge,
              {
                backgroundColor: focused
                  ? Colors.tabIconSelected
                  : Colors.tabIconDefault,
              },
            ]}
          >
            <Text
              style={{
                color: Colors.panel,
                fontSize: 10,
                ...Platform.select({
                  ios: {
                    marginTop: 2,
                  },
                  android: {
                    marginTop: 0,
                  },
                }),
              }}
            >
              {counter}
            </Text>
          </View>
        )}
      </View>
    )
 // }
}

const blockStyles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 0,
    right: 30,
    minWidth: 18,
    height: 18,
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
