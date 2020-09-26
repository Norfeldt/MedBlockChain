import React from 'react'
import { View } from 'react-native'
import Text from '../basic/Text'
import Colors from '../../constants/Colors'

export default function MiddlePart(props) {
  //render() {
    const { hashAlgorithmName } = props
    return (
      <View
        style={{
          flex: 1,
          borderLeftColor: Colors.themeColor,
          borderLeftWidth: 2,
          marginVertical: 5,
          marginHorizontal: 5,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style="code" style={{ fontSize: 6, color: Colors.themeColor }}>
            {hashAlgorithmName}
          </Text>
        </View>
        <View
          style={{
            flex: 9,
            borderTopColor: Colors.themeColor,
            borderTopWidth: 2,
          }}
        />
      </View>
    )
//  }
}
