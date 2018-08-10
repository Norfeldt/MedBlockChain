import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

import QRCode from 'react-native-qrcode'

import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class DrugQR extends PureComponent {
  render() {
    const {
      window: { width },
      isSmallDevice,
    } = Layout
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <View
          style={{
            padding: 10,
            borderColor: Colors.headerLine,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 20,
            backgroundColor: Colors.scrollBGLight,
          }}
        >
          <QRCode
            value={this.props.value}
            size={isSmallDevice ? width * 0.9 : width * 0.5}
            bgColor={Colors.dark}
            fgColor={Colors.scrollBGLight}
          />
        </View>
      </View>
    )
  }
}
