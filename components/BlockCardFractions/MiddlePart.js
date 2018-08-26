import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Text from '../basic/Text'
import Colors from '../../constants/Colors'

export default class MiddlePart extends PureComponent {
  render() {
    const { hashAlgorithmName } = this.props
    return (
      <View
        style={{
          flex: 1,
          borderLeftColor: Colors.headerLine,
          borderLeftWidth: 1,
          marginVertical: 5,
          marginHorizontal: 5,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style="code" style={{ fontSize: 6 }}>
            {hashAlgorithmName}
          </Text>
        </View>
        <View
          style={{
            flex: 9,
            borderTopColor: Colors.headerLine,
            borderTopWidth: 1,
          }}
        />
      </View>
    )
  }
}
