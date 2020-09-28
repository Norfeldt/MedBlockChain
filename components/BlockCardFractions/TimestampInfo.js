import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from '../basic/Text'
import Colors from '../../constants/Colors'
import { styleHashBlock } from '../basic/HashBlock'

export default function TimestampInfo(props) {
    const { timestamp } = props
    return (
      <View
        style={{
          borderTopColor: Colors.passive,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text type="h4" style={{ paddingBottom: 0 }}>
          TIMESTAMP
        </Text>
        <View
          style={{
            backgroundColor: Colors.passiveBG,
            ...styleHashBlock,
          }}
        >
          <Text type="code">{timestamp}</Text>
        </View>
      </View>
    )
}
