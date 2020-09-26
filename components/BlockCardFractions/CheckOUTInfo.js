import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/Colors'
import HashBlock from '../basic/HashBlock'
import Text from '../basic/Text'
import ListData from '../ListData'

export default function CheckOUTInfo(props) {
 // render() {
    const { productData, productDataHash } = props
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
//  }
}
