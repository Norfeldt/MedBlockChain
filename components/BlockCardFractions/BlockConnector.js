import React from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors'

export default function BlockConnector(props) {
 // render() {
    const lineWidth = 2
    return (
      <View
        style={{
          flexDirection: 'row',
          height: props.height || 30,
        }}
      >
        <View style={{ flex: 20 }} />

        <View style={{ flex: 60 }}>
          <View
            style={{
              flex: 1,
              borderLeftWidth: props.lineWidth || lineWidth,
              borderLeftColor: props.lineColor || Colors.passive,
            }}
          />
          <View
            style={{
              flex: 0,
              borderBottomWidth: props.lineWidth || lineWidth,
              borderBottomColor: props.lineColor || Colors.passive,
            }}
          />
          <View
            style={{
              flex: 1,
              borderRightWidth: props.lineWidth || lineWidth,
              borderRightColor: props.lineColor || Colors.passive,
            }}
          />
        </View>

        <View style={{ flex: 20 }} />
      </View>
    )
 // }
}
