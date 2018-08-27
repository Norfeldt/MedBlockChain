import React, { PureComponent } from 'react'
import { View, StyleSheet, Switch } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'

export default class App extends PureComponent {
  render() {
    const { name, desc, fontAwesome } = this.props
    const title = desc || name

    const Icon = () => {
      if (fontAwesome) {
        return (
          <FontAwesome
            name={name}
            size={30}
            style={{ marginRight: 10, width: 30 }}
          />
        )
      }
      return (
        <FontIcon
          name={name}
          size={30}
          style={{ marginRight: 10, width: 30 }}
        />
      )
    }
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
          <Icon />
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
