import invert from 'invert-color'
import trim from 'lodash/trim'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Text from './Text'
import { getHashColors } from '../../constants/Colors'

export default class HashBlock extends PureComponent {
  render() {
    const { backgroundColor, color } = getHashColors(this.props.value)
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
