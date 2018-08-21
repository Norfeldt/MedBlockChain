import invert from 'invert-color'
import trim from 'lodash/trim'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Text from './Text'

export default class HashBlock extends PureComponent {
  render() {
    const backgroundColor = `#${this.props.value.slice(0, 6)}`
    const color = invert(backgroundColor, true)
    return (
      <View
        style={{
          backgroundColor,
          margin: 10,
          padding: 10,
          borderRadius: 7,
        }}
      >
        <Text type="code" style={[{ color }, this.props.textStyle]}>{`${trim(
          this.props.value.replace(/(.{32})/g, '$1\n')
        )}`}</Text>
      </View>
    )
  }
}
