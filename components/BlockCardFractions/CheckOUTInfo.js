import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import HashBlock, { styleHashBlock } from '../basic/HashBlock'
import Text from '../basic/Text'
import ListData from '../ListData'

export default class CheckOUTInfo extends PureComponent {
  render() {
    const { productData, productDataHash, hashAlgorithmName } = this.props
    return (
      <View
        style={{
          borderTopColor: Colors.passive,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text type="h4" style={{ paddingBottom: 0 }}>
          PRODUCT DATA
        </Text>
        <ListData data={productData} />

        <HashBlock value={productDataHash} />
      </View>
    )
  }
}
