import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import Text from '../basic/Text'
import HashBlock from '../basic/HashBlock'
import ListData from '../ListData'

export default class CheckINInfo extends PureComponent {
  render() {
    const { drugMetaData, productDataHash } = this.props

    return (
      <View
        style={{
          borderTopColor: Colors.passive,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text type="h4">PRODUCT DATA</Text>
        <Text
          type="code"
          style={{ color: Colors.warning }}
        >{`SECRET INFORMATION!`}</Text>
        <Text type="code">{`The information is only existing together with the genuine medicine product and will be exposed when a CHECK OUT of this specific medicine product is added to the blockchain\n`}</Text>
        <Text type="h4">META DATA</Text>
        <ListData data={drugMetaData} />
        <Text type="h4" style={{ paddingBottom: 0 }}>
          CHECK IN
        </Text>
        <HashBlock value={productDataHash} />
      </View>
    )
  }
}
