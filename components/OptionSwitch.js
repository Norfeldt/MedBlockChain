import React, { PureComponent } from 'react'
import { View, StyleSheet, Switch } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'
import Colors from '../constants/Colors'

export default class App extends PureComponent {
  render() {
    const { name, desc, font } = this.props
    const title = desc || name

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <FontIcon
            name={name}
            font={font}
            size={30}
            style={{ marginRight: 10, width: 30 }}
            color={Colors.themeColor}
          />
          <Text style={{ flex: 1, fontSize: 22, textAlign: 'left' }}>
            {title.toUpperCase()}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Switch />
        </View>
      </View>
    )
  }
}
