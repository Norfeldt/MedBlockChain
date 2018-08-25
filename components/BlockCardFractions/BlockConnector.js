import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors'

export default class BlockConnector extends PureComponent {
  render() {
    const lineWidth = 2
    return (
      <View style={{ flexDirection: 'row', height: this.props.height || 30 }}>
        <View style={{ flex: 20 }} />

        <View style={{ flex: 60 }}>
          <View
            style={{
              flex: 1,
              borderLeftWidth: this.props.lineWidth || lineWidth,
              borderLeftColor: Colors.passive,
            }}
          />
          <View
            style={{
              flex: 0,
              borderBottomWidth: this.props.lineWidth || lineWidth,
              borderBottomColor: Colors.passive,
            }}
          />
          <View
            style={{
              flex: 1,
              borderRightWidth: this.props.lineWidth || lineWidth,
              borderRightColor: Colors.passive,
            }}
          />
        </View>

        <View style={{ flex: 20 }} />
      </View>
    )
  }
}
