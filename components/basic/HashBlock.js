import trim from 'lodash/trim'
import React from 'react'
import { View } from 'react-native'
import Text from './Text'
import { getHashColors } from '../../constants/Colors'

export function HashBlock(props) {
  //render() {
    const { backgroundColor, color } = getHashColors(props.value)
    return (
      <View
        style={{
          backgroundColor,
          ...styleHashBlock,
        }}
      >
        <Text type="code" style={[{ color }, props.textStyle]}>{`${trim(
          props.value.replace(/(.{32})/g, '$1\n')
        )}`}</Text>
      </View>
    )
 // }
}

export default HashBlock

export const styleHashBlock = {
  margin: 10,
  padding: 10,
  borderRadius: 7,
}
